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
    o = request.GET.get('o', 0)
    user = users_models.User.objects.get(pk = pk)
    user_list_json = {"user": str(user.username), "places": []}
    places = user.list.all()
    if len(places) > 0:
        for place in places[0].places.all():
            photos = []
            if not o:
                photos = [
                    image["link"]
                    for image in place_views.get_images(str(place.name), option=1)
                ]
            user_list_json.get("places").append({
                "id": place.contentid,
                "name": str(place.name),
                "address": str(place.address),
                "x": float(place.mapx),
                "y": float(place.mapy),
                "photos": photos
            })
    return JsonResponse(user_list_json)


@method_decorator(csrf_exempt, name = "dispatch")
def create_list(request):
    received_json_data = json.loads(request.body.decode("utf-8"))
    user_pk = received_json_data.get("user_id")
    user = users_models.User.objects.get(pk = user_pk)
    content = received_json_data.get("content")
    place_pk = content.get("placeId")
    place_name = content.get("placeName")
    place_address = content.get("addressName")
    place_mapx = content.get("mapx")
    place_mapy = content.get("mapy")

    user_list = models.List.objects.get_or_none(user_id=user)
    place = place_models.Place.objects.get_or_none(contentid=place_pk)
    if user_list is None:
        user_list = models.List.objects.create(
            name = f"{user.username}'s List",
            user = user,
        )
    if place is None:
        place = place_models.Place.objects.create(
            name = place_name,
            contentid = place_pk,
            address = place_address,
            mapx = place_mapx,
            mapy = place_mapy,
        )
    user_list.places.add(place)
    user_list.save()

    user_list_json = {
        "username": str(user.username),
        "user_id": str(user_pk),
        "user_profile": str(user.profile_img.url),
        "user_list": []
    }
    if user_list:
        for l in user_list.places.all():
            user_list_json.get("user_list").append(l.name)

    return JsonResponse(user_list_json)


@method_decorator(csrf_exempt, name = "dispatch")
def delete_list(request):
    received_json_data = json.loads(request.body.decode("utf-8"))
    place_id = received_json_data.get("place_id")
    user_id = received_json_data.get("user_id")
    user = users_models.User.objects.get(id = user_id)
    list_places = user.list.all()[0].places.all()
    for list_place in list_places:

        if list_place.contentid == place_id:
            list_place.delete()
    return JsonResponse({})