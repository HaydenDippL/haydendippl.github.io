from django.urls import path
from . import views

from .api_views.project import ProjectDetail
from .api_views.blog import BlogDetail

urlpatterns = [
    path("", views.getData),
    path("project/<int:id>", ProjectDetail.as_view(), name="project_detail"),
    path("blog/<int:id>", BlogDetail.as_view(), name="blog_detail")
]