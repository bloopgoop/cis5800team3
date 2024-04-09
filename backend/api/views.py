from datetime import datetime
import json
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from .models import User, Appointment
from .decorators import login_required

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

class EmailTokenObtainSerializer(TokenObtainSerializer):
    username_field = User.EMAIL_FIELD


class CustomTokenObtainPairSerializer(EmailTokenObtainSerializer):
    @classmethod
    def get_token(cls, user):
        token = RefreshToken.for_user(user)

        # Add custom claims
        token['email'] = user.email

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        return data


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


@api_view(['GET'])
def health(request):
    return Response("Backend is up and running")


@api_view(['POST'])
def register(request):
    data = json.loads(request.body)

    try:
        user = User.objects.create(
            email=data['email'],
            password=make_password(data['password']),
        )
        user.save()
        return JsonResponse({"message": "User created successfully."}, status=201)
    except IntegrityError as e:
        print(e)
        return JsonResponse({"message": "Username already taken."}, status=400)


@login_required()
@api_view(['POST', 'GET'])
def appointment(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            # Convert the date from ISO 8601 format to YYYY-MM-DD format
            date = datetime.strptime(data['time'], "%Y-%m-%dT%H:%M:%S.%fZ").date()

            appointment = Appointment.objects.create(
                user=request.user,
                service=data['service'],
                staff=data['staff'],
                price=data['price'],
                date=date,
            )
            appointment.save()
            return JsonResponse({"message": "Appointment created successfully."}, status=201)
        except Exception as e:
            print(e)
            return JsonResponse({"message": "Failed to create appointment."}, status=400)
    if request.method == 'GET':
        appointments = Appointment.objects.filter(user=request.user)
        appointments = list(appointments.values())
        return JsonResponse(appointments, safe=False)