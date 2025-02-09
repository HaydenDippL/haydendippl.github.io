from django.db import models
from django.utils import timezone
import uuid

class User(models.Model):
    user_id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, null=False, editable=False, db_comment="UUID to track a user in the cookies/local storage")
    created_at = models.DateTimeField(auto_now_add=True, editable=False, db_comment="Start time of the session")

    def __str__(self):
        return f"user {str(self.user_id)}, created {self.created_at.strftime('%Y-%m-%d %H:%M:%S')}"

class Session(models.Model):
    session_id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, null=False, editable=False, db_comment="UUID created by backend and given to frontend to track current session, expires after a day")
    created_at = models.DateTimeField(auto_now_add=True, editable=False, db_comment="Start time of the session")
    user = models.ForeignKey(User, on_delete=models.CASCADE, editable=False, db_comment="the user of the session")

    def __str__(self):
        return f"session {str(self.session_id)}, created {self.created_at.strftime('%Y-%m-%d %H:%M:%S')}, user {str(self.user.user_id)}"

class PageAnalytic(models.Model):
    PAGE_CHOICES = {
        1: "home",
        2: "blogs",
        3: "projects",
        4: "blog",
        5: "project",
        6: "analytics"
    }
    PAGE_CHOICES_REVERSE = { v: k for k, v in PAGE_CHOICES.items() }

    session = models.ForeignKey(Session, on_delete=models.CASCADE, editable=False, null=True)
    page = models.PositiveSmallIntegerField(choices=PAGE_CHOICES, default=0, editable=False, db_comment="The page viewed ['home', 'blogs', 'projects']")
    viewed_at = models.DateTimeField(auto_now_add=True, editable=False, db_comment="The date and time that the link was taken")

    def __str__(self):
        return f"{self.PAGE_CHOICES[self.page].upper()} at {self.viewed_at.strftime('%Y-%m-%d %H:%M:%S')}: session [{self.session.session_id}]"

class LinksTaken(models.Model):
    LINK_CHOICES = {
        1: "LinkedIn",
        2: "YouTube",
        3: "GitHub"
    }
    LINK_CHOICES_REVERSE = { v: k for k, v in LINK_CHOICES.items() }

    session = models.ForeignKey(Session, on_delete=models.CASCADE, editable=False, null=True)
    link = models.PositiveSmallIntegerField(choices=LINK_CHOICES, default=0, editable=False, db_comment="The link taken ['LinkedIn', 'YouTube', 'GitHub']")
    taken_at = models.DateTimeField(auto_now_add=True, editable=False, db_comment="The date and time that the link was taken")

    def __str__(self):
        return f"Referred to {self.LINK_CHOICES[self.link]} at {self.taken_at.strftime('%Y-%m-%d %H:%M:%S')}: session [{self.session.session_id}]"

class ReferredFrom(models.Model):
    LINK_CHOICES = {
        1: "LinkedIn",
        2: "YouTube",
        3: "GitHub"
    }
    LINK_CHOICES_REVERSE = { v: k for k, v in LINK_CHOICES.items() }

    session = models.ForeignKey(Session, on_delete=models.CASCADE, editable=False, null=True)
    link = models.PositiveSmallIntegerField(choices=LINK_CHOICES, default=0, editable=False, db_comment="The link referred from ['LinkedIn', 'YouTube', 'GitHub']")
    taken_at = models.DateTimeField(auto_now_add=True, editable=False, db_comment="The date and time that the user was referred to the website")

    def __str__(self):
        return f"Referred from {self.LINK_CHOICES[self.link]} at {self.taken_at.strftime('%Y-%m-%d %H:%M:%S')}: session [{self.session.session_id}]"


class ArticleAnalytic(models.Model):
    ARTICLE_CHOICES = {
        1: "blog",
        2: "project"
    }
    ARTICLE_CHOICES_REVERSE = { v: k for k, v in ARTICLE_CHOICES.items() }

    session = models.ForeignKey(Session, on_delete=models.CASCADE, editable=False, null=True)
    article_type = models.PositiveSmallIntegerField(choices=ARTICLE_CHOICES, default=0, editable=False, db_comment="The link taken ['unknown', 'blog', 'project']")
    article_id = models.PositiveSmallIntegerField(editable=False, db_default=-1, db_comment="The id of the article")
    viewed_at = models.DateTimeField(auto_now_add=True, editable=False, db_comment="The date and time that the link was taken")

    def __str__(self):
        return f"{self.ARTICLE_CHOICES[self.article_type].upper()} {self.article_id} at {self.viewed_at.strftime('%Y-%m-%d %H:%M:%S')}: session [{self.session.session_id}]"