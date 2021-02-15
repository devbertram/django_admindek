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

    fullname = serializers.SerializerMethodField('get_fullname')

    class Meta:
        model = User
        fields = ('id', 'username', 'fullname', 'date_joined', 'last_login', 'is_active')

    def get_fullname(self, user):
        return user.first_name +" "+ user.last_name



class UserFormSerializer(serializers.ModelSerializer): 

    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'username', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }


    def create(self, validated_data):

        user = User.objects.create(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            username=validated_data['username'],
            is_staff=False,
            is_active=False,
            is_superuser=False,
        )
        user.set_password(validated_data['password'])
        user.save()
        return user