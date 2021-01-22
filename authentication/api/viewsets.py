
from authentication.models import UserRoute
from .serializers import UserRouteSerializer

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response



class UserRouteViewSet(viewsets.ModelViewSet):

    @action(methods=['get'], detail=False)
    def get_by_user(self, request):
        user_route = UserRoute.objects.all().filter(user_id=request.user.id).prefetch_related('route').select_related('route')
        serializer =  UserRouteSerializer(user_route, many=True)
        return Response(serializer.data)