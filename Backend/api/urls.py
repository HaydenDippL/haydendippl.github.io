from django.urls import path

# from .api_views.project import ProjectDetail
# from .api_views.blog import BlogDetail, get_blogs

from .api_views.analytics import log_user_session, log_page, log_external_link

urlpatterns = [
    path("session", log_user_session, name="log_session"),
    path("page", log_page, name="log page"),
    path("referring", log_external_link, name="log link taken away from website")
]