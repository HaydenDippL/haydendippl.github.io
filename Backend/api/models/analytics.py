from django.db import models

import uuid

class User(models.Model):
    user_id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True, db_comment="UUID to track a user in the cookies/local storage")
    created_at = models.DateTimeField(auto_now_add=True, editable=False, db_comment="Start time of the session")

class Session(models.Model):
    session_id = models.AutoField(primary_key=True, null=False, editable=False, db_comment="Session id int created by backend and given to frontend")
    created_at = models.DateTimeField(auto_now_add=True, editable=False, db_comment="Start time of the session")
    user = models.ForeignKey(User, on_delete=models.CASCADE, editable=False, db_comment="id of the user")

class PageAnalytic(models.Model):
    PAGE_CHOICES = {
        0: "unknown",
        1: "home",
        2: "blogs",
        3: "projects",
        4: "blog",
        5: "projects",
        6: "analytics"
    }

    session = models.ForeignKey(Session, on_delete=models.CASCADE, editable=False)
    page = models.PositiveSmallIntegerField(choices=PAGE_CHOICES, default=0, editable=False, db_comment="The page viewed ['home', 'blogs', 'projects']")
    viewed_at = models.DateTimeField(auto_now_add=True, editable=False, db_comment="The date and time that the link was taken")

class LinksTaken(models.Model):
    LINK_CHOICES = {
        0: "unknown",
        1: "LinkedIn",
        2: "YouTube",
        3: "GitHub"
    }

    session = models.ForeignKey(Session, on_delete=models.CASCADE, editable=False)
    link = models.PositiveSmallIntegerField(choices=LINK_CHOICES, default=0, editable=False, db_comment="The link taken ['LinkedIn', 'YouTube', 'GitHub']")
    taken_at = models.DateTimeField(auto_now_add=True, editable=False, db_comment="The date and time that the link was taken")

class ReferredFrom(models.Model):
    LINK_CHOICES = {
        0: "unknown",
        1: "LinkedIn",
        2: "YouTube",
        3: "GitHub"
    }

    session = models.ForeignKey(Session, on_delete=models.CASCADE, editable=False)
    link = models.PositiveSmallIntegerField(choices=LINK_CHOICES, default=0, editable=False, db_comment="The link taken ['LinkedIn', 'YouTube', 'GitHub']")
    taken_at = models.DateTimeField(auto_now_add=True, editable=False, db_comment="The date and time that the user was referred to the website")


class ArticleAnalytic(models.Model):
    ARTICLE_CHOICES = {
        0: "unknown",
        1: "blog",
        2: "project"
    }

    session = models.ForeignKey(Session, on_delete=models.CASCADE, editable=False)
    article_type = models.PositiveSmallIntegerField(choices=ARTICLE_CHOICES, default=0, editable=False, db_comment="The link taken ['unknown', 'blog', 'project']")
    article_id = models.PositiveSmallIntegerField(editable=False, db_default=-1, db_comment="The id of the article")
    viewed_at = models.DateTimeField(auto_now_add=True, editable=False, db_comment="The date and time that the link was taken")