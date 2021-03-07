from authentication.api.viewsets import RouteViewSet, SubrouteViewSet,UserRouteViewSet, UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('user', UserViewSet, basename='user')
router.register('user_route', UserRouteViewSet, basename='user-route')
router.register('route', RouteViewSet, basename='route')
router.register('subroute', SubrouteViewSet, basename='subroute')

urlpatterns = router.urls