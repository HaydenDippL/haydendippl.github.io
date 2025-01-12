from django.contrib import admin

from api.models.blog import Blog
from api.models.project import Project

admin.site.register(Blog)
admin.site.register(Project)