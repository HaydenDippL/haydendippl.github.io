from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# from .models import Blog
# from .serializer import BlogSerializer

@api_view(["GET"])
def get_blog(request):
    dummy_data = {"endpoint": "get-blog"}
    response = Response(dummy_data)
    return response

@api_view(["POST"])
def post_blog(request):
    dummy_data = {"endpoint": "post-blog"}
    response = Response(dummy_data)
    return response

@api_view(["PUT"])
def put_blog(request):
    dummy_data = {"endpoint": "put-blog"}
    response = Response(dummy_data)
    return response

@api_view(["DELETE"])
def delete_blog(request):
    dummy_data = {"endpoint": "delete-blog"}
    response = Response(dummy_data)
    return response

def retrieve_blog(id):
    pass