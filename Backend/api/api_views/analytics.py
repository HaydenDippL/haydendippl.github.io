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

# TODO: log new session
@api_view(["POST"])
def log_session(request):
    """
    Log the session of a user

    200 OK
    400 BAD REQUEST
        - Request doesn't contain exactly id, created_at, and or ip
    """
    pass

# TODO: log which page you are on
@api_view(["POST"])
def log_page(request):
    """
    Log the page the user is on

    200 OK
    400 BAD REQUEST
        - Request doesn't contain exactly session, page, viewed_at
    404 NOT FOUND 
        - Session not fonud
    """
    pass

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