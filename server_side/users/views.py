import os
import requests
from django.shortcuts import reverse, redirect
from django.contrib.auth import authenticate, login, logout
from django.views.generic import FormView
from django.urls import reverse_lazy
from . import forms, models
from rest_framework import viewsets  # add this
from .serializers import UserSerializer  # add this


# Create your views here.
class UserView(viewsets.ModelViewSet):  # add this
    serializer_class = UserSerializer  # add this
    queryset = models.User.objects.all()


class LoginView(FormView):
    template_name = "users/login.html"
    form_class = forms.LoginForm
    success_url = reverse_lazy("core:home")

    def form_valid(self, form):
        email = form.cleaned_data.get("email")
        password = form.cleaned_data.get("password")
        user = authenticate(self.request, username=email, password=password)
        if user is not None:
            login(self.request, user)

        return super().form_valid(form)


def log_out(request):
    logout(request)
    return redirect(reverse("core:home"))


class KakaoException(Exception):
    pass


def kakao_login(request):
    client_id = os.environ.get("KAKAO_ID")
    redirect_uri = "http://127.0.0.1:8000/users/login/kakao/callback"
    return redirect(
        f"https://kauth.kakao.com/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code"
    )


def kakao_callback(request):
    try:
        code = request.GET.get("code")
        print(code)
        client_id = os.environ.get("KAKAO_ID")
        redirect_uri = "http://127.0.0.1:8000/users/login/kakao/callback"
        token_request = requests.get(
            f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={client_id}&redirect_uri={redirect_uri}&code={code}"
        )
        token_json = token_request.json()
        print(token_json)
        error = token_json.get("error", None)
        if error is not None:
            raise KakaoException("Can't get authorise code.")
        access_token = token_json.get("access_token")
        profile_request = requests.get(
            "https://kapi.kakao.com/v2/user/me",
            headers={"Authorization": f"Bearer {access_token}"},
        )
        profile_json = profile_request.json()

        email = profile_json.get("kakao_account").get("email")
        if email is None:
            raise KakaoException("Please give us your email :)")
        properties = profile_json.get("properties")
        nickname = properties.get("nickname")
        profile_image = properties.get("profile_image")
        try:
            user = models.User.objects.get(email=email)
        except models.User.DoesNotExist:
            print("Not found")
            user = models.User.objects.create(
                email=email,
                username=email,
                first_name=nickname,
            )
            user.set_unusable_password()
            user.save()
            if profile_image is not None:
                pass  # Todo further
        login(request, user)
        return redirect(reverse("core:home"))
    except KakaoException as e:
        return redirect(reverse("users:login"))