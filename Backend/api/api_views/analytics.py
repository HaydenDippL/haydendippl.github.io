# NON_ESSENTIAL ENDPOINTS
# TODO: get total page viewd by each page
# TODO: get timeline of views for a page
# TODO: get total referred links
# TODO: get referred links over time
# TODO: get blog views over time
# TODO: get sessions over time

from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models.analytics import User, Session, PageAnalytic, LinksTaken, ReferredFrom,  ArticleAnalytic
from datetime import timedelta
from django.utils import timezone

def get_session_or_ERROR_Response(session_id):
    """
    Validates the session_id by returning the Session object instance.
    Session must be less than a day old.

    or

    403 FORBIDDEN return {
        "error": "session-id invalid"
    } if Session does not exist
    
    418 SESSION EXPIRED return {
        "error": "session expired"
    } if Session is over day old
    """

    session = None
    try:
        # Get Session
        session = Session.objects.get(session_id=session_id)
    except:
        # If session does not exist 403 FORBIDDEN
        return Response({ "error": "session-id invalid" }, status=403)
    
    # If session is day old 418 SESSION EXPIRED
    if session.created_at < timezone.now() - timedelta(days=1):
        return Response({ "error": "session expired" }, status=418)

    return session

@api_view(["POST"])
def create_user(request):
    """
    Create a new user for the client and send back the user-id

    200 OK returns {
        "user-id": <user-id>
    }
    500 INTERNAL SERVER ERROR
        - Error creating user
    """

    # try to create user or return 500 INTERNAL SERVER ERROR
    user = None
    try:
        user = User.objects.create()
    except:
        return Response({ "error": "internal server error" }, status=500)

    # return user-id 200 OK
    return Response({ "user-id": user.user_id }, status=200)

@api_view(["POST"])
def create_session(request):
    """
    Create a new session for a given user

    Body:
        - user-id: a UUID of the user

    200 OK Returns {
        "session-id": <session-id>
    }
    400 BAD REQUEST
        - user-id is not specified in body
    403 FORBIDDEN
        - user-id does not belong to any User
    500 INTERNAL SERVER ERROR
        - Error creating session
    """

    user_id = request.data.get("user-id")

    # check that user-id was specified or return 400 BAD REQUEST
    if not all([user_id]):
        return Response({ "error": "Must specify valid user-id in body" }, status=400)
    
    # get user or return 403 FORBIDDEN
    user = None
    try:
        user = User.objects.get(user_id=user_id)
    except:
        return Response({ "error": "user-id is invalid" }, status=403)

    # try to create session or return 500 INTERNAL SERVER ERROR
    session = None
    try:
        session = Session.objects.create(user=user)
    except:
        return Response({ "error": "internal server error" }, status=500)

    # return session-id 200 OK
    return Response({ "session-id": session.session_id }, status=200)

@api_view(["POST"])
def log_page(request):
    """
    Log the page the user is on

    BODY:
        - session-id
        - page ["home", "blogs", "projects", "blog", "project", "analytics"]

    200 OK
    400 BAD REQUEST
        - Request doesn't contain session-id
        - Request doesn't contain page
        - page is not a valid page choice: ("home", "blogs", "projects", "blog", "project", "analytics")
    403 FORBIDDEN
        - invalid session-id
    418 SESSION EXPIRED
        - session is over day old
    500 INTERNAL SERVER ERROR
        - problem creating analytic entry
    """

    session_id = request.data.get("session-id")
    page = request.data.get("page")

    # check that session_id and page specified in body or 400 BAD REQUEST
    if not all([session_id, page]):
        return Response({ "error": "Must specify valid session-id and page" }, status=400)
    
    # check that page is a valid page or 400 BAD REQUEST
    if page not in PageAnalytic.PAGE_CHOICES_REVERSE:
        return Response({ "error": f"Must be a valid page [string] - {PageAnalytic.PAGE_CHOICES.values()}" }, status=400)
    page_choice = PageAnalytic.PAGE_CHOICES_REVERSE[page]

    session_or_response = get_session_or_ERROR_Response(session_id)
    if isinstance(session_or_response, Response):
        return session_or_response
    session = session_or_response
    
    # create page analytic log or 500 INTERNAL SERVER ERROR
    try:
        PageAnalytic.objects.create(session=session, page=page_choice)
    except:
        return Response({ "error": "Error creating analytic log" }, status=500)
    
    return Response(status=200)

@api_view(["POST"])
def log_referring_to(request):
    """
    Log the link taken away from the site.

    BODY:
        - session-id
        - link ["LinkedIn", "GitHub", "YouTube"]

    200 OK
    400 BAD REQUEST
        - Request doesn't contain session-id or link
        - link is not a valid choice: ("LinkedIn", "GitHub", "YouTube")
    403 FORBIDDEN
        - invalid session-id
    418 SESSION EXPIRED
        - session is over day old
    500 INTERNAL SERVER ERROR
        - problem creating analytic log
    """

    session_id = request.data.get("session-id")
    link = request.data.get("link")

    # check that session_id and link specified in body or 400 BAD REQUEST
    if not all([link]):
        return Response({ "error": "Must specify valid link" }, status=400)
    
    # check that link is a valid link or 400 BAD REQUEST
    if not isinstance(link, str) or link not in LinksTaken.LINK_CHOICES.values():
        return Response({ "error": f"Must be a valid external link [string] - {LinksTaken.LINK_CHOICES.values()}" }, status=400)
    link_choice = LinksTaken.LINK_CHOICES_REVERSE[link]

    session_or_response = get_session_or_ERROR_Response(session_id)
    if isinstance(session_or_response, Response):
        return session_or_response
    session = session_or_response
    
    # create link analytic log or 500 INTERNAL SERVER ERROR
    try:
        LinksTaken.objects.create(session=session, link=link_choice)
    except:
        return Response({ "error": "Error creating analytic log" }, status=500)
    
    return Response(status=200)  

@api_view(["POST"])
def log_referral_from(request):
    """
    Log the referral link that directed the user to the site.

    BODY:
        - session-id
        - link ["LinkedIn", "GitHub", "YouTube"]

    200 OK
    400 BAD REQUEST
        - Request doesn't contain session-id or link
        - link is not a valid choice: ("LinkedIn", "GitHub", "YouTube")
    403 FORBIDDEN
        - invalid session-id
    418 SESSION EXPIRED
        - session is over day old
    500 INTERNAL SERVER ERROR
        - problem creating analytic log
    """
    
    session_id = request.data.get("session-id")
    link = request.data.get("link")

    # check that session_id and page specified in body or 400 BAD REQUEST
    if not all([link]):
        return Response({ "error": "Must specify valid link" }, status=400)
    
    # check that link is a valid page or 400 BAD REQUEST
    if not isinstance(link, str) or link not in ReferredFrom.LINK_CHOICES.values():
        return Response({ "error": f"Must be a valid external link [string] - {ReferredFrom.LINK_CHOICES.values()}" }, status=400)
    link_choice = ReferredFrom.LINK_CHOICES_REVERSE[link]

    session_or_response = get_session_or_ERROR_Response(session_id)
    if isinstance(session_or_response, Response):
        return session_or_response
    session = session_or_response
    
    # create link analytic log or 500 INTERNAL SERVER ERROR
    try:
        ReferredFrom.objects.create(session=session, link=link_choice)
    except:
        return Response({ "error": "Error processing request" }, status=500)
    
    return Response(status=201 if session == None else 200)

@api_view(["POST"])
def log_article(request):
    """
    Log which article (blog or project) a user is viewing

    BODY:
        - session-id
        - article-type ["blog", "project"]
        - article-id [int]

    200 OK
    400 BAD REQUEST
        - Request doesn't contain session-id, article-id, or article-choice
        - link is not a valid choice: ("blog", "project")
        - article-id is not a positive int
    403 FORBIDDEN
        - invalid session-id
    418 SESSION EXPIRED
        - session is over day old
    500 INTERNAL SERVER ERROR
        - problem creating analytic log
    """

    session_id = request.data.get("session-id")
    article_type = request.data.get("article-type")
    article_id = request.data.get("article-id")

    # check that session_id and page specified in body or 400 BAD REQUEST
    if not all([article_type, article_id]):
        return Response({ "error": "Must specify valid article type and article id" }, status=400)
    
    # check that article_type is a valid article_type or 400 BAD REQUEST
    if not isinstance(article_type, str) or article_type not in ArticleAnalytic.ARTICLE_CHOICES.values():
        return Response({ "error": f"Must be a valid article type [string] - {ArticleAnalytic.ARTICLE_CHOICES.values()}" }, status=400)
    article_type_choice = ArticleAnalytic.ARTICLE_CHOICES_REVERSE[article_type]

    # check that article_id is a valid article_id or 400 BAD REQUEST
    try:
        article_id = int(article_id)
    except:
        return Response({ "error": "article_id must correspond to an article" }, status=400)
    if article_id < 0:
        return Response({ "error": "article_id must correspond to an article" }, status=400)

    session_or_response = get_session_or_ERROR_Response(session_id)
    if isinstance(session_or_response, Response):
        return session_or_response
    session = session_or_response
    
    # create link analytic log or 500 INTERNAL SERVER ERROR
    try:
        ArticleAnalytic.objects.create(session=session, article_type=article_type_choice, article_id=article_id)
    except:
        return Response({ "error": "Error processing request" }, status=500)
    
    return Response(status=200)

# TODO: get total sessions
@api_view(["GET"])
def get_total_sessions(request):
    """
    Return the total sessions created on the website

    200 OK
    """
    pass

# TODO: get total users (ip)
@api_view(["GET"])
def get_total_users(request):
    """
    Return the total users (unique ips) that have visited the site

    200 OK
    """
    pass

# TODO: get total views per blog id
@api_view(["GET"])
def get_total_views_per_article(request):
    """
    Return the views per article (blog or project)

    query: ?blogs=1,2,3,4&projects=1,4,8

    200 OK
    400 BAD REQUEST
        - If no query parameters or query parameters do not contain "blogs" or "projects" list
    """
    pass