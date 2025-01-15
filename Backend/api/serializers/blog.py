from rest_framework import serializers
from ..models.blog import Blog

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = "__all__"

class BlogPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ["id", "title", "description", "starred", "published", "modified", "image"]
