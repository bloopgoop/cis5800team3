import time
import json
from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.http import HttpResponse, HttpResponseRedirect
from django.core.paginator import Paginator
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User

from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def health(request):
    return Response("Backend is up and running")


@api_view(['POST'])   
def register(request):
    username = request.POST["username"]
    email = request.POST["email"]
    password = request.POST["password"]

    # Attempt to create new user
    try:
        user = User.objects.create_user(username, email, password)
        user.save()
        return JsonResponse({"message": "User created successfully."}, status=201)
    except IntegrityError as e:
        print(e)
        return HttpResponse("Username already taken.", status=400)  