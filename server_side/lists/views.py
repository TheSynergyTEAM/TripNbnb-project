import os
import json
from rest_framework import viewsets  # add this
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.shortcuts import render, redirect, reverse
from .serializers import ListSerializer
from users import models as users_models
from django.http import JsonResponse
from . import models
from places import models as place_models
from places import views as place_views

# Create your views here.


class ListView(viewsets.ModelViewSet):
    serializer_class = ListSerializer
    queryset = models.List.objects.all()
    print()


@method_decorator(csrf_exempt, name = "dispatch")
def list_view(request, pk):

    user = users_models.User.objects.get(pk = pk)
    user_list_json = {"user": str(user.username), "places": []}
    places = user.list.all()
    if len(places) > 0:
        for _place in places:
            place = _place.places.get()
            user_list_json.get("places").append({
                "name":
                str(place.name),
                "address":
                str(place.address),
                "photos": [
                    image["link"]
                    for image in place_views.get_images(str(place.name))
                ]
            })

    return JsonResponse(user_list_json)


@method_decorator(csrf_exempt, name = "dispatch")
def create_list(request):
    received_json_data = json.loads(request.body.decode("utf-8"))
    user_pk = received_json_data.get("userid")
    user = users_models.User.objects.get(pk = user_pk)
    content = received_json_data.get("content")
    place_pk = content.get("placeId")
    place_name = content.get("placeName")
    place_address = content.get("addressName")
    place_mapx = content.get("mapx")
    place_mapy = content.get("mapy")

    try:
        user_list = models.List.objects.get(user = user)

    except models.List.DoesNotExist:
        try:
            place = place_models.objects.get(contentid = place_pk)
        except place_models.Place.DoesNotExist:
            place = place_models.Place.objects.create(
                name = place_name,
                contentid = place_pk,
                address = place_address,
                mapx = place_mapx,
                mapy = place_mapy,
            )
        user_list = models.List.objects.create(
            name = f"{user.username}'s List",
            user = user,
        )
    user_list.places.add(place)
    user_list.save()

    user_list_json = {
        "username": str(user.username),
        "user_id": str(user_pk),
        "user_profile": str(user.profile_img.url),
        "user_list": []
    }
    for l in user_list.places.all():
        user_list_json.get("user_list").append(l.name)

    return JsonResponse(user_list_json)
