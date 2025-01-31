from django.db import models

class Session(models.Model):
    id = models.CharField(max_length=255, primary_key=True, editable=False, db_comment="Frontend JS session id")
    created_at = models.DateTimeField(auto_now_add=True, editable=False, db_comment="Start time of the session")
    ip = models.GenericIPAddressField(editable=False, db_comment="The IP address using this session")

class PageAnalytics(models.Model):
    PAGE_CHOICES = {
        0: "unknown",
        1: "home",
        2: "blogs",
        3: "projects"
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

class ArticleAnalytics(models.Model):
    ARTICLE_CHOICES = {
        0: "unknown",
        1: "blog",
        2: "project"
    }

    session = models.ForeignKey(Session, on_delete=models.CASCADE, editable=False)
    article = models.PositiveSmallIntegerField(choices=ARTICLE_CHOICES, default=0, editable=False, db_comment="The link taken ['LinkedIn', 'YouTube', 'GitHub']")
    article_id = models.PositiveSmallIntegerField(editable=False, db_default=-1, db_comment="The id of the article")
    taken_at = models.DateTimeField(auto_now_add=True, editable=False, db_comment="The date and time that the link was taken")