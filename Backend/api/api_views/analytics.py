# ESSENTIAL ENDPOINTS

# NON_ESSENTIAL ENDPOINTS
# TODO: get total page viewd by each page
# TODO: get timeline of views for a page
# TODO: get total referred links
# TODO: get referred links over time
# TODO: get blog views over time
# TODO: get sessions over time


from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from ..models.analytics import User, Session, PageAnalytic

# TODO: log new session
@api_view(["POST"])
def log_user_session(request):
    """
    Log the session of a user. If a client does not specify user_id, it creates a new
    user. If the client specifies a user_id that does not exist, it creates a new user.
    Returns 200 OK response with the session-id and user-id.

    Body:
    - user_id: uuid of user

    200 OK
    """
    user_id = request.data.get("user_id")
    
    try:
        user = User.objects.get(user_id=user_id)
    except User.DoesNotExist:
        user = User.objects.create()
    
    session = Session.objects.create(user=user)

    return Response({ "session-id": session.session_id, "user-id": session.user.user_id }, status=200)

# TODO: log which page you are on
@api_view(["POST"])
def log_page(request):
    """
    Log the page the user is on

    200 OK
    400 BAD REQUEST
        - Request doesn't contain session, page, viewed_at
        - Request doesn't contain valid page in PAGE_CHOICE (Ex: \"home\")
        - Request isn't in a valid session
        - Request isn't from a valid user or user-id doesn't match session's user-id
    """

    user_id = request.data.get("user-id")
    session_id = request.data.get("session-id")
    page = request.data.get("page")

    if not all([user_id, session_id, page]):
        return Response({ "error": "Must specify valid user-id, session-id, and page" }, status=400)
    
    if not isinstance(page, str) or page.lower() not in PageAnalytic.PAGE_CHOICES_REVERSE:
        return Response({ "error": f"Must be a valid page [string] - {PageAnalytic.PAGE_CHOICES.values()}" }, status=400)
    
    page_choice = PageAnalytic.PAGE_CHOICES_REVERSE[page]

    session = None
    try:
        session = Session.objects.get(session_id=session_id)
    except Session.DoesNotExist:
        return Response({ "error": "Must be in a valid user-session" }, status=400)
    
    print(session.user.user_id)
    print(user_id)
    if str(session.user.user_id) != str(user_id):
        return Response({ "error": "Must be in a valid user-session" }, status=400)
    
    try:
        PageAnalytic.objects.create(session=session, page=page_choice)
    except:
        return Response({ "error": "Error processing request" }, status=500)
    
    return Response(status=200)

# TODO: log which link is taken
@api_view(["POST"])
def log_external_link(request):
    """
    Log the external links a user takes from the page

    200 OK
    400 BAD REQUEST
        - Request doesn't contain session, link, and taken_at
    404 NOT FOUND
        - Session not found
    """
    pass

# TODO: log which link referred user to website
@api_view(["POST"])
def log_referral_link(request):
    """
    Log the referral link that directed the user to the site

    200 OK
    400 BAD REQUEST
        - request doesn't contain exactly session, link, taken_at
    404 NOT FOUND
        - Session not found
    """
    pass

# TODO: log which blog / project you're viewing
@api_view(["POST"])
def log_article(request):
    """
    Log which article (blog or project) a user is viewing

    200 OK
    400 BAD REQUEST
        - request doesn't contain exactly session, article_type, article_id, and viewed_at
    404 NOT FOUND
        - Session not found
    """
    pass

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