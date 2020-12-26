import os
import json
import urllib.request
from rest_framework import viewsets  # add this
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.generic import ListView, DetailView, View
from django.shortcuts import render, redirect, reverse
from . import models
from .serializers import PlaceSerializer

# Create your views here.


class PlaceView(viewsets.ModelViewSet):
    serializer_class = PlaceSerializer
    queryset = models.Place.objects.all()
    print()


@method_decorator(csrf_exempt, name="dispatch")
def placeview(request, pk):
    # receive json data from clinet
    # json file
    # required data
    # name, contentid, city ,address ,mapx ,mapy ,writer ,place_img
    return redirect("https://localhost:3000/map")

def tourist_destination_view(request):
    city = request.GET.get("city")
    client_id = os.environ.get("NAVER_CLIENT_ID")
    client_secret = os.environ.get("NAVER_CLIENT_SECRET")
    encText = urllib.request.quote(city)
    url = "https://openapi.naver.com/v1/search/image?query=" + encText + "&display=20"
    url_request = urllib.request.Request(url)
    url_request.add_header("X-Naver-Client-Id", client_id)
    url_request.add_header("X-Naver-Client-Secret", client_secret)
    response = urllib.request.urlopen(url_request)
    
    rescode = response.getcode()
    print("rescode" + str(rescode))
    if rescode == 200:
            response_body = response.read()
            print(response_body.decode("utf-8"))
            received_json_data = json.loads(response_body.decode("utf-8"))
            items = received_json_data.get("items")
            city_json = {str(city):[]}
            for item in items:
                img_link = item.get("link")
                city_json.get(str(city)).append(img_link)
            print(city_json)
    else:
            print("Error Code:" +str(rescode))

    return render(request, "")