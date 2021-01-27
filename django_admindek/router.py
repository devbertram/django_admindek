from authentication.api.viewsets import UserRouteViewSet, UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('user_route', UserRouteViewSet, basename='user-route')
router.register('user', UserViewSet, basename='user')

urlpatterns = router.urls