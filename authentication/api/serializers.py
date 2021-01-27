from rest_framework import serializers

from authentication.models import Route, Subroute, UserRoute, UserSubroute
from django.contrib.auth.models import User


class RouteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Route
        fields = ('category', 'name', 'nav_name', 'url', 'url_name', 'icon', 'is_menu', 'is_dropdown')



class SubrouteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subroute
        fields = ('is_nav', 'name', 'nav_name', 'url', 'url_name')



class UserSubrouteSerializer(serializers.ModelSerializer):

    subroute = SubrouteSerializer()

    class Meta:
        model = UserSubroute
        fields = ('subroute',)



class UserRouteSerializer(serializers.ModelSerializer):
    
    route = RouteSerializer()
    userSubroute_userRoute = UserSubrouteSerializer(many=True)

    class Meta:
        model = UserRoute
        fields = ('route', 'userSubroute_userRoute')



class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'date_joined', 'last_login', 'is_active')