
from authentication.models import UserRoute
from django.contrib.auth.models import User

from .serializers import UserRouteSerializer, UserSerializer
from .pagination import UserListPagination

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response



class UserRouteViewSet(viewsets.ModelViewSet):
    
    @action(methods=['get'], detail=False)
    def get_by_user(self, request):
        user_route = UserRoute.objects.all().filter(user_id=request.user.id).prefetch_related('route').select_related('route')
        serializer =  UserRouteSerializer(user_route, many=True)
        return Response(serializer.data)



class UserViewSet(viewsets.ModelViewSet):
    
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = UserListPagination

    def list(self, request):
        page = self.paginate_queryset(self.queryset)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)
    
