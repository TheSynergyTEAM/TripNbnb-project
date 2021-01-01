import os
import json
import urllib.request
from django.http import JsonResponse
from rest_framework import viewsets  # add this
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.generic import ListView, DetailView, View
from django.shortcuts import render, redirect, reverse
from . import models
from reviews import models as review_models
from .serializers import PlaceSerializer
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

class PlaceView(viewsets.ModelViewSet):
    serializer_class = PlaceSerializer
    queryset = models.Place.objects.all()
    print()

@method_decorator(csrf_exempt, name="dispatch")
def place_view(request, id):
    place_json = {
        "data" : [],
        "images" : [],
    }
    place_name = request.GET.get("name")
    try:
        place = models.Place.objects.get(contentid=id)
        reviews = place.reviews_p.all()
        for review in reviews:
            place_json["data"].append(
                {
                    "username" : str(review.user),
                    "review" : str(review.review),
                    "rating" : str(review.rating),
                    "created" : str(review.created),
                }
            )
    except models.Place.DoesNotExist:
        pass
    images = get_images(str(place_name))
    for img in images:
        place_json["images"].append(img["link"])

    return JsonResponse(place_json)

def place_photos_view(request):
    city = request.GET.get("city")


    items = get_images(city)
    city_json = {str(city):[]}
    for item in items:
        img_link = item.get("link")
        city_json.get(str(city)).append(img_link)

    return JsonResponse(city_json)

def get_images(keyword):
    client_id = os.environ.get("NAVER_CLIENT_ID")
    client_secret = os.environ.get("NAVER_CLIENT_SECRET")
    encText = urllib.request.quote(keyword)
    url = "https://openapi.naver.com/v1/search/image?query=" + encText + "&display=20"
    url_request = urllib.request.Request(url)
    url_request.add_header("X-Naver-Client-Id", client_id)
    url_request.add_header("X-Naver-Client-Secret", client_secret)
    response = urllib.request.urlopen(url_request)
    
    rescode = response.getcode()
    if rescode == 200:
        response_body = response.read()
        received_json_data = json.loads(response_body.decode("utf-8"))
        items = received_json_data.get("items")
        return items
    else:
        print("Error Code:" +str(rescode))
        return 