from authentication.api.viewsets import RouteViewSet, SubrouteViewSet, UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('user', UserViewSet, basename='user')
router.register('route', RouteViewSet, basename='route')
router.register('subroute', SubrouteViewSet, basename='subroute')

urlpatterns = router.urls