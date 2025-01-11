from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# from .models import Blog
# from .serializer import BlogSerializer

@api_view(["GET"])
def get_project(request):
    dummy_data = {"endpoint": "get-project"}
    response = Response(dummy_data)
    return response

@api_view(["POST"])
def post_project(request):
    dummy_data = {"endpoint": "post-project"}
    response = Response(dummy_data)
    return response

@api_view(["PUT"])
def put_project(request):
    dummy_data = {"endpoint": "put-project"}
    response = Response(dummy_data)
    return response

@api_view(["DELETE"])
def delete_project(request):
    dummy_data = {"endpoint": "delete-project"}
    response = Response(dummy_data)
    return response

def retrieve_project(id):
    pass