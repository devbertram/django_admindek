
from authentication.models import UserRoute
from django.contrib.auth.models import User

from django.db.models import Q
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import UserRouteSerializer, UserSerializer, UserFormSerializer
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
        
        search = request.GET.get('q', None)
        online_status = request.GET.get('os', None)
        su_status = request.GET.get('sus', None)     
        filter_conditions = Q()

        if search or online_status or su_status:

            if search:
                filter_conditions.add(Q(username__icontains=search) | Q(first_name__icontains=search) | Q(last_name__icontains=search), Q.AND)

            if online_status:
                filter_conditions.add(Q(is_active = online_status), Q.AND) 

            if su_status:
                filter_conditions.add(Q(is_superuser = su_status), Q.AND)

            page = self.paginate_queryset(self.queryset.filter(filter_conditions).order_by('-date_joined'))

        else:
            
            page = self.paginate_queryset(self.queryset.order_by('-date_joined'))
        
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)
        


    def create(self, request):

        serializer = UserFormSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_instance = serializer.create(request.data)
        return Response({"id": user_instance.id}, 201)








    
