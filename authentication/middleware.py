from django.utils.deprecation import MiddlewareMixin
from django.core.exceptions import PermissionDenied
from django.urls import resolve
from .models import UserRoute, UserSubroute

from django_admindek.urls import urlpatterns

class CheckIfUserRouteExist(MiddlewareMixin):

    route_exceptions = [
        "dashboard_main_page",
        "dashboard_profile_page",
        "user-set-username",
        "user-set-password",
        "user-route-get-by-user",
        "route-get-all",
        "route-detail",
        "logout_user"
    ]

    def process_request(self, request):
        current_url_name = resolve(request.path_info).url_name

        for url in urlpatterns:
            if hasattr(url, 'url_patterns'):
                for up in url.url_patterns:
                    if up.__class__.__name__ == "URLPattern":
                            print(up)

            
        if request.user.is_authenticated and request.user.is_superuser == False:
            if current_url_name not in self.route_exceptions:
                if self.isUserRouteExist(request.user.id, current_url_name) or self.isUserSubrouteExist(request.user.id, current_url_name):
                    pass
                else:
                    raise PermissionDenied()


    def isUserRouteExist(self, user_id, current_url_name):
        user_route_count = 0
        user_routes = UserRoute.objects.filter(user = user_id).prefetch_related('route').select_related('route')
        for data in user_routes:
            if data.route.url_name == current_url_name:
                user_route_count += 1
        return True if user_route_count > 0 else False


    def isUserSubrouteExist(self, user_id, current_url_name):
        user_subroute_count = 0
        user_subroutes = UserSubroute.objects.filter(user = user_id).prefetch_related('subroute').select_related('subroute')
        for data in user_subroutes:
            if data.subroute.url_name == current_url_name:
                user_subroute_count += 1
        return True if user_subroute_count > 0 else False


