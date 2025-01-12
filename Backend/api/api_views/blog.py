from rest_framework.decorators import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models.blog import Blog
from ..serializers.blog import BlogSerializer

class BlogDetail(APIView):
    def get(self, request, id):
        dummy_data = {"endpoint": "get-blog", "id": id}
        response = Response(dummy_data)
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