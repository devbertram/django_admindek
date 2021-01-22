
from django.urls import path, include
from . import views


urlpatterns = [

    path('', views.loginPage, name='login_page'),
    path('set_username_logout', views.setUsernamelogoutPage, name='set_username_logout_page'),
    path('set_password_logout', views.setPasswordlogoutPage, name='set_Password_logout_page'),
    path('logout/', views.logoutUser, name='logout_user'),
    path('dashboard', views.dashboardPage, name='dashboard_home_page'),
    path('dashboard/profile', views.userProfilePage, name='dashboard_user_profile_page'),


    #djoser
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    
]