from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .apis import RegisterAPI, CustomTokenObtainPairAPI

app_name = 'custom_auth'

urlpatterns = [
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', CustomTokenObtainPairAPI.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='refresh'),
]