from rest_framework.decorators import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.utils import timezone
from ..models.blog import Blog
from ..serializers.blog import BlogSerializer, BlogPreviewSerializer

class BlogDetail(APIView):
    def get(self, request, id):
        blog = get_object_or_404(Blog, pk=id)
        data = {}

        serializer = BlogSerializer(blog)
        get_preview = request.GET.get("preview", "false").lower()
        print(get_preview)
        if get_preview == "true":
            serializer = BlogPreviewSerializer(blog)
        data.update(serializer.data)

        get_next = request.GET.get("next", "false").lower()
        if get_next == "true":
            next_blog = Blog.objects.filter(
                published__gt = blog.published, published__lt = timezone.now()
            ).order_by("published").first()
            data["next"] = None if not next_blog else BlogPreviewSerializer(next_blog).data
        
        get_prev = request.GET.get("prev", "false").lower()
        if get_prev == "true":
            prev_blog = Blog.objects.filter(
                published__lt = blog.published
            ).order_by("-published").first()
            data["prev"] = None if not prev_blog else BlogPreviewSerializer(prev_blog).data

        response = Response(data)
        return response

    def post(self, request, id):
        dummy_data = {"endpoint": "post-blog", "id": id}
        response = Response(dummy_data)
        return response

    def put(self, request, id):
        dummy_data = {"endpoint": "put-blog", "id": id}
        response = Response(dummy_data)
        return response

    def delete(self, request, id):
        dummy_data = {"endpoint": "delete-blog", "id": id}
        response = Response(dummy_data)
        return response
    
@api_view(["GET"])
def get_blogs(request):
    blogs = Blog.objects.all().order_by("-created")

    starred = request.GET.get("starred", "false")
    if starred.lower() == "true":
        blogs = blogs.filter(starred=True)
    elif starred.lower() == "false":
        pass # Do nothing to select both starred and unstarred
    else:
        return Response(
            {"error": "Invalid value for 'starred'. Must be 'true' or 'false'."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        n = int(request.GET.get("n", -1))
    except:
        return Response(
            {"error": "Invalid value for 'n'. Must be a positive or negative integer."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    if n > 0:
        blogs = blogs[:n]

    serializer = BlogSerializer(blogs, many=True)
    response = Response(serializer.data)
    return response