from django.contrib import admin

from api.models.blog import Blog
from api.models.project import Project

from api.models.analytics import User, Session, PageAnalytic, LinksTaken, ReferredFrom, ArticleAnalytic

admin.site.register(User)
admin.site.register(Session)
admin.site.register(PageAnalytic)
admin.site.register(LinksTaken)
admin.site.register(ReferredFrom)
admin.site.register(ArticleAnalytic)