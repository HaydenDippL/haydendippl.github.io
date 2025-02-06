# Generated by Django 5.1.4 on 2025-02-06 15:59

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_project_published_alter_blog_published'),
    ]

    operations = [
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.CharField(db_comment='Frontend JS session id', editable=False, max_length=255, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True, db_comment='Start time of the session')),
                ('ip', models.GenericIPAddressField(db_comment='The IP address using this session', editable=False)),
            ],
        ),
        migrations.AlterField(
            model_name='blog',
            name='published',
            field=models.DateTimeField(db_default=datetime.datetime(2025, 2, 7, 7, 0, tzinfo=datetime.timezone.utc), help_text='The publish time of the blog'),
        ),
        migrations.AlterField(
            model_name='project',
            name='published',
            field=models.DateTimeField(db_default=datetime.datetime(2025, 2, 7, 7, 0, tzinfo=datetime.timezone.utc), help_text='The publish time of the project'),
        ),
        migrations.CreateModel(
            name='ReferredFrom',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('link', models.PositiveSmallIntegerField(choices=[(0, 'unknown'), (1, 'LinkedIn'), (2, 'YouTube'), (3, 'GitHub')], db_comment="The link taken ['LinkedIn', 'YouTube', 'GitHub']", default=0, editable=False)),
                ('taken_at', models.DateTimeField(auto_now_add=True, db_comment='The date and time that the user was referred to the website')),
                ('session', models.ForeignKey(editable=False, on_delete=django.db.models.deletion.CASCADE, to='api.session')),
            ],
        ),
        migrations.CreateModel(
            name='PageAnalytics',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('page', models.PositiveSmallIntegerField(choices=[(0, 'unknown'), (1, 'home'), (2, 'blogs'), (3, 'projects'), (4, 'blog'), (5, 'projects'), (6, 'analytics')], db_comment="The page viewed ['home', 'blogs', 'projects']", default=0, editable=False)),
                ('viewed_at', models.DateTimeField(auto_now_add=True, db_comment='The date and time that the link was taken')),
                ('session', models.ForeignKey(editable=False, on_delete=django.db.models.deletion.CASCADE, to='api.session')),
            ],
        ),
        migrations.CreateModel(
            name='LinksTaken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('link', models.PositiveSmallIntegerField(choices=[(0, 'unknown'), (1, 'LinkedIn'), (2, 'YouTube'), (3, 'GitHub')], db_comment="The link taken ['LinkedIn', 'YouTube', 'GitHub']", default=0, editable=False)),
                ('taken_at', models.DateTimeField(auto_now_add=True, db_comment='The date and time that the link was taken')),
                ('session', models.ForeignKey(editable=False, on_delete=django.db.models.deletion.CASCADE, to='api.session')),
            ],
        ),
        migrations.CreateModel(
            name='ArticleAnalytics',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('article_type', models.PositiveSmallIntegerField(choices=[(0, 'unknown'), (1, 'blog'), (2, 'project')], db_comment="The link taken ['unknown', 'blog', 'project']", default=0, editable=False)),
                ('article_id', models.PositiveSmallIntegerField(db_comment='The id of the article', db_default=-1, editable=False)),
                ('viewed_at', models.DateTimeField(auto_now_add=True, db_comment='The date and time that the link was taken')),
                ('session', models.ForeignKey(editable=False, on_delete=django.db.models.deletion.CASCADE, to='api.session')),
            ],
        ),
    ]
