from django.contrib.auth import authenticate, login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.http import HttpResponse
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer


class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    @method_decorator(csrf_protect)
    def post(self, request):
        username = request.data.get('username', '').strip().lower()
        password = request.data.get('password', '')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            if user.is_active:
                login(request, user)
                serializer = UserSerializer(user)
                return Response(serializer.data, content_type='application/json')
            else:
                return Response({'error': 'Your account is deactivated.'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'error': 'Username and password don\'t match.'}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def get(self, request):
        logout(request)
        return Response()


class CSRFTokenView(APIView):
    permission_classes = (permissions.AllowAny,)

    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        return HttpResponse()


class UserView(APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)