
from authentication.models import Route, Subroute, UserRoute
from django.contrib.auth.models import User

from django.db.models import Q
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import connection

from .serializers import (
    RouteSerializer,
    RouteCreateFormSerializer,
    RouteUpdateFormSerializer,
    SubrouteUpdateFormSerializer,
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
        

    def create(self, request):
        serializer = RouteCreateFormSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        subroutes = serializer.data['subroutes']

        # Create Route   
        route = Route()
        route.name = serializer.data['name']
        route.category = serializer.data['category']
        route.nav_name = serializer.data['nav_name']
        route.url = serializer.data['url']
        route.url_name = serializer.data['url_name']
        route.icon = serializer.data['icon']
        route.is_menu = serializer.data['is_menu']
        route.is_dropdown = serializer.data['is_dropdown']
        route.created_by_id = request.user.id
        route.updated_by_id = request.user.id
        route.save()
        
        # Create Subroute
        if subroutes:
            for data in subroutes:
                subroute = Subroute()
                subroute.route_id = route.id
                subroute.is_nav = data['is_nav']
                subroute.name = data['name']
                subroute.nav_name = data['nav_name']
                subroute.url = data['url']
                subroute.url_name = data['url_name']
                subroute.save()

        return Response({"id": route.id}, 201)


    def retrieve(self, request, pk=None):
        route = self.queryset.get(id=pk)
        if route:
            serializer = self.get_serializer(route)
            return Response(serializer.data, 200)
        else:
            return Response({}, 404)
    
    
    def update(self, request, pk=None):
        serializer = RouteUpdateFormSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        route = self.queryset.get(id=pk)
        route.name = serializer.data['name']
        route.category = serializer.data['category']
        route.nav_name = serializer.data['nav_name']
        route.url = serializer.data['url']
        route.url_name = serializer.data['url_name']
        route.icon = serializer.data['icon']
        route.is_menu = serializer.data['is_menu']
        route.is_dropdown = serializer.data['is_dropdown']
        route.updated_by_id = request.user.id
        route.save()

        return Response({"id":route.id}, 200)


    @action(methods=['get'], detail=False)
    def get_all(self, request):
        routes_queryset = Route.objects.all()
        serializer = self.get_serializer(routes_queryset, many=True)
        return Response(serializer.data, 200)



class SubrouteViewSet(viewsets.ModelViewSet):

    def update(self, request, pk=None):
        serializer = SubrouteUpdateFormSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        subroute = Subroute.objects.get(route_id=serializer.data['route'], id=pk)

        if subroute:
            subroute.is_nav = serializer.data['is_nav']
            subroute.name = serializer.data['name']
            subroute.nav_name = serializer.data['nav_name']
            subroute.url = serializer.data['url']
            subroute.url_name = serializer.data['url_name']
            subroute.save()

        return Response({"id":subroute.id}, 200)



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








    
