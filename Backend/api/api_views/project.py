from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.project import Project

def retrieve_project(id):
    pass

class ProjectDetail(APIView):
    def get(self, request, id):
        dummy_data = {"endpoint": "get-project", "id": id}
        response = Response(dummy_data)
        return response
    
    def post(self, request, id):
        dummy_data = {"endpoint": "post-project", "id": id}
        response = Response(dummy_data)
        return response
    
    def put(self, request, id):
        dummy_data = {"endpoint": "put-project", "id": id}
        response = Response(dummy_data)
        return response
    
    def delete(self, request, id):
        dummy_data = {"endpoint": "delete-project", "id": id}
        response = Response(dummy_data)
        return response