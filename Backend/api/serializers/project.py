from rest_framework import serializers
from models.project import Project

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"