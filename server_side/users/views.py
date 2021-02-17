import os
import requests
import json
from django.http import JsonResponse
from django.shortcuts import reverse, redirect
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.urls import reverse_lazy
from django.core.files.base import ContentFile
from . import models
from rest_framework import viewsets  # add this
from .serializers import UserSerializer  # add this


# Create your views here.
class UserView(viewsets.ModelViewSet):  # add this
  serializer_class = UserSerializer  # add this
  queryset = models.User.objects.all()
  print()


@method_decorator(csrf_exempt, name="dispatch")
def kakao_login(request):
  received_json_data = json.loads(request.body.decode("utf-8"))
  pk = received_json_data.get("id")
  properties = received_json_data.get("properties")
  nickname = properties.get("nickname")
  profile_image = properties.get("profile_image")
  print(profile_image)
  try:
    user = models.User.objects.get(pk=pk)
  except models.User.DoesNotExist:
    print("Not found")
    user = models.User.objects.create(
        pk=pk,
        username=nickname,
        first_name=nickname,
    )
    user.set_unusable_password()
    user.save()
    if profile_image is not None:
      photo_request = requests.get(profile_image)
      user.profile_img.save(
          f"{nickname}-profile image", ContentFile(photo_request.content)
      )
  login(request, user)
  return redirect("http://localhost:3000")


@method_decorator(csrf_exempt, name="dispatch")
def kakao_unlink(request):
  user_data = json.loads(request.body.decode("utf-8"))
  pk = user_data.get("id")
  user = models.User.objects.get(pk=pk)
  user.delete()
  return redirect("http://localhost:3000")


@method_decorator(csrf_exempt, name="dispatch")
def get_profile(request, pk):
  user = models.User.objects.get(pk=pk)
  user_reviews = user.reviews_u.all()
  user_json = {
      "username": str(user.username),
      "user_reviews": [],
      "user_biography": str(user.biography),
      "user_profile" : None,
  }
  try:
    user_json["user_profile"]= (user.profile_img.url)
  except ValueError as e:
    pass
  print("pin")
  for user_review in user_reviews:
    user_json["user_reviews"].append(
        {
            "place": str(user_review.place.name),
            "review": str(user_review.review),
        }
    )
  print(user_json)
  return JsonResponse(user_json)
