from django.urls import path
from . import views

app_name = "users"

urlpatterns = [
    path("login", views.kakao_login, name="login"),
    path("logout/", views.log_out, name="logout"),
]
