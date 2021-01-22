from authentication.api.viewsets import UserRouteViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('user_route', UserRouteViewSet, basename='user_route')

urlpatterns = router.urls