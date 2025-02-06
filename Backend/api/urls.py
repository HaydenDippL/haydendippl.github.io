from django.urls import path

# from .api_views.project import ProjectDetail
# from .api_views.blog import BlogDetail, get_blogs

from .api_views.analytics import log_user_session, log_page

urlpatterns = [
    path("session", log_user_session, name="log_session"),
    path("page", log_page, name="log page")
]