from django.http import HttpResponse
from django.shortcuts import redirect
from .models import User
from django.conf import settings
import jwt


def login_required():
    def decorator(view_func):
        def wrapper_func(request, *args, **kwargs):

            if 'Authorization' not in request.headers:
                return HttpResponse("No Token", status=401)

            access_token = request.headers['Authorization']
            (scheme, access_token) = access_token.split(' ')
            if scheme != 'Bearer':
                return HttpResponse("Invalid Token", status=401)
            
            token_data = jwt.decode(
                access_token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(id=token_data['user_id'])
            request.user = user
            return view_func(request, *args, **kwargs)

        return wrapper_func
    return decorator
