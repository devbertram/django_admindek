from rest_framework import serializers

from authentication.models import Route, Subroute, UserRoute, UserSubroute
from django.contrib.auth.models import User



class SubrouteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subroute
        fields = ('id', 'is_nav', 'name', 'nav_name', 'url', 'url_name')



class RouteSerializer(serializers.ModelSerializer):

    subroute_route = SubrouteSerializer(many=True)
    
    class Meta:
        model = Route
        fields = ('id', 'category', 'name', 'nav_name', 'url', 'url_name', 'icon', 'is_menu', 'is_dropdown', 'subroute_route')



class UserSubrouteSerializer(serializers.ModelSerializer):

    subroute = SubrouteSerializer()

    class Meta:
        model = UserSubroute
        fields = ('subroute',)
        


class UserSubrouteFormSerializer(serializers.Serializer):
    
    value = serializers.IntegerField(required=True)
    label = serializers.CharField(required=True, max_length=100)



class UserRouteSerializer(serializers.ModelSerializer):
    
    route = RouteSerializer()
    userSubroute_userRoute = UserSubrouteSerializer(many=True)

    class Meta:
        model = UserRoute
        fields = ('route', 'userSubroute_userRoute')



class UserRouteFormSerializer(serializers.Serializer):
    
    value = serializers.IntegerField(required=True)
    label = serializers.CharField(required=True, max_length=100)



class UserSerializer(serializers.ModelSerializer): 

    fullname = serializers.SerializerMethodField('get_fullname')

    class Meta:
        model = User
        fields = ('id', 'username', 'fullname', 'date_joined', 'last_login', 'is_active')

    def get_fullname(self, user):
        return user.first_name +" "+ user.last_name



class UserFormSerializer(serializers.ModelSerializer): 

    user_routes = UserRouteFormSerializer(many=True)
    user_subroutes = UserSubrouteFormSerializer(many=True)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'username', 'password', 'user_routes', 'user_subroutes')
        extra_kwargs = { 'password': {'write_only': True} }

    def create(self, validated_data):
        
        user_routes = validated_data['user_routes']
        user_subroutes = validated_data['user_subroutes']

        #Insert User
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

        #insert User Routes
        for user_route in user_routes:

            user_route = UserRoute.objects.create(
                route_id=user_route['value'],
                user_id=user.id,
            )
            user_route.save()

            #insert User Subroutes
            for user_subroute in user_subroutes:
                subroute = Subroute.objects.all().get(id=user_subroute['value'])
                if subroute.route_id == user_route.route_id:
                    user_subroute = UserSubroute.objects.create(
                        user_route_id=user_route.id,
                        subroute_id=user_subroute['value'],
                        user_id=user.id,
                    )
                    user_subroute.save()
            
        return user