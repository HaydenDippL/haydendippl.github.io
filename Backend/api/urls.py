from django.urls import path

# from .api_views.project import ProjectDetail
# from .api_views.blog import BlogDetail, get_blogs

from .api_views.analytics import log_user_session

urlpatterns = [
    path("session", log_user_session, name="log_session")
]