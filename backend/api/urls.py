from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt

from .views import EmailTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('health', views.health, name='health'),

    path('token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.register, name='register'),

    path('appointment/', csrf_exempt(views.appointment), name='appointment'),
]
