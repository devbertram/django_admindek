
from authentication.models import Route, UserRoute
from django.contrib.auth.models import User

from django.db.models import Q
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import (
    RouteSerializer,
    UserRouteSerializer,
    UserSerializer,
    UserCreateFormSerializer,
    UserUpdateFormSerializer,
)

from .pagination import (
    UserListPagination, 
    RouteListPagination
)



class RouteViewSet(viewsets.ModelViewSet):
    
    queryset = Route.objects.all()
    serializer_class = RouteSerializer
    pagination_class = RouteListPagination


    @action(methods=['get'], detail=False)
    def get_all(self, request):
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data, 200)


    def list(self, request):
        search = request.GET.get('q', None)  
        filter_conditions = Q()

        if search:
            if search:
                filter_conditions.add(Q(name__icontains=search) | Q(category__icontains=search), Q.AND)
            page = self.paginate_queryset(self.queryset.filter(filter_conditions).order_by('-updated_at'))

        else:
            page = self.paginate_queryset(self.queryset.order_by('-updated_at'))
        
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)


    def retrieve(self, request, pk=None):
        route = self.queryset.get(id=pk)
        if route:
            serializer = self.get_serializer(route)
            return Response(serializer.data, 200)
        else:
            return Response({}, 404)



class UserRouteViewSet(viewsets.ModelViewSet):
    
    @action(methods=['get'], detail=False)
    def get_by_user(self, request):
        user_route = UserRoute.objects.all().filter(user_id=request.user.id).prefetch_related('route').select_related('route')
        serializer =  UserRouteSerializer(user_route, many=True)
        return Response(serializer.data, 200)



class UserViewSet(viewsets.ModelViewSet):
    
    queryset = User.objects.all()
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
        serializer = UserCreateFormSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.create(request.data)
        return Response({"id": user.id}, 201)


    def retrieve(self, request, pk=None):
        user = self.queryset.get(id=pk)
        if user:
            serializer = self.get_serializer(user)
            return Response(serializer.data, 200)
        else:
            return Response({}, 404)
    
    
    def update(self, request, pk=None):
        user = self.queryset.get(id=pk)
        if user:
            serializer = UserUpdateFormSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.update(user, request.data)
            return Response({"id": pk}, 200)
        else:
            return Response({}, 404)


    def destroy(self, request, pk=None):
        user = self.queryset.get(id=pk)
        if user:
            user.delete()
            return Response({}, 200)
        else:
            return Response({}, 404)








    
