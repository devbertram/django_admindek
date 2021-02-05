
from authentication.models import UserRoute
from django.contrib.auth.models import User

from django.db.models import Q
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import UserRouteSerializer, UserSerializer
from .pagination import UserListPagination



class UserRouteViewSet(viewsets.ModelViewSet):
    
    @action(methods=['get'], detail=False)
    def get_by_user(self, request):
        user_route = UserRoute.objects.all().filter(user_id=request.user.id).prefetch_related('route').select_related('route')
        serializer =  UserRouteSerializer(user_route, many=True)
        return Response(serializer.data)



class UserViewSet(viewsets.ModelViewSet):
    
    queryset = User.objects.only('id', 'username', 'is_active', 'last_login', 'date_joined')
    serializer_class = UserSerializer
    pagination_class = UserListPagination


    def list(self, request):
        
        search_query = request.GET.get('q', None)
        online_status = request.GET.get('os', None)
        su_status = request.GET.get('sus', None)        
        filter_conditions = dict()

        if search_query:

            page = self.paginate_queryset(
                    self.queryset
                        .filter(
                            Q(username__icontains=search_query) |
                            Q(first_name__icontains=search_query) |
                            Q(last_name__icontains=search_query)
                        )
                        .order_by('-date_joined')
                )

        elif online_status or su_status:

            if online_status:
                filter_conditions['is_active'] = online_status
            
            if su_status:
                filter_conditions['is_superuser'] = su_status

            page = self.paginate_queryset(
                    self.queryset
                        .filter(**filter_conditions)
                        .order_by('-date_joined')
                )

        else:
            
            page = self.paginate_queryset(self.queryset.order_by('-date_joined'))
        
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    
