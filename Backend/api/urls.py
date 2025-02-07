from django.urls import path

# from .api_views.project import ProjectDetail
# from .api_views.blog import BlogDetail, get_blogs

from .api_views.analytics import create_user, create_session, log_page, log_referring_to, log_referral_from, log_article

urlpatterns = [
    path("user", create_user, name="create user"),
    path("session", create_session, name="create session"),
    path("page", log_page, name="log page"),
    path("referring_to", log_referring_to, name="log link taken away from website"),
    path("referred_from", log_referral_from, name="log link referred from"),
    path("article", log_article, name="log article")
]