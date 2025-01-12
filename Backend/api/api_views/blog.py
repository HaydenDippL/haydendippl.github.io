from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
# from .models import Blog
# from .serializer import BlogSerializer

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