from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import UserRegistrationView, UserLoginView, UserLogoutView
urlpatterns = [
    path('register/',UserRegistrationView.as_view(),name='Registration'),
    path('login/',UserLoginView.as_view(),name='Login'),
    path('logout/',UserLogoutView.as_view(),name='Logout'),
    path('refresh/',TokenRefreshView.as_view(),name='Token Refresh'),
]
