from users import views
from django.urls import path

urlpatterns = [
    path('login', views.LoginView.as_view()),
    path('logout', views.LogoutView.as_view()),
    path('CSRFtoken', views.CSRFTokenView.as_view()),
    path('user', views.UserView.as_view()),
]
