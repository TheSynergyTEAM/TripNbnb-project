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
    place = models.Place.objects.get(pk=id)
    reviews = place.reviews_p.all()
    place_json = {
        "place_name" : str(place),
        "place_img" : [],
        "all_reviews" : [],
        # Ratings
    }
    for review in reviews:
        place_json["all_reviews"].append(
            {str(review.user) : str(review.review)}
        )
    images = get_images(str(place))
    for img in images:
        place_json["place_img"].append(img["link"])

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