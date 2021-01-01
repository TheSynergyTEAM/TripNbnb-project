import os
import json
from rest_framework import viewsets  # add this
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.generic import ListView, DetailView, View
from django.shortcuts import render, redirect, reverse
from . import models
from users import models as user_models
from places import models as place_models
from .serializers import ReviewSerializer

# Create your views here.

class ReviewView(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = models.Review.objects.all()
    print()


@method_decorator(csrf_exempt, name="dispatch")
def write_review(request):
    # receive json data from clinet
    received_json_data = json.loads(request.body.decode("utf-8"))
    print(received_json_data)
    user_pk = received_json_data.get("user").get("id")
    user = user_models.User.objects.get(pk=user_pk)
    content = received_json_data.get("content")
    review_text = content.get("review")
    rating = content.get("rating")
    
    place_name = content.get("placeName")
    place_contentid = content.get("placeId")
    place_city = content.get("")
    place_address = content.get("addressName")
    place_mapx = content.get("mapx")
    place_mapy = content.get("mapy")
    try:
        place = place_models.Place.objects.get(contentid=place_contentid)
    except place_models.Place.DoesNotExist:
        place = place_models.Place.objects.create(
            name= place_name,
            contentid= place_contentid,
            address= place_address,
            mapx= place_mapx,
            mapy= place_mapy,
        )
    review = models.Review.objects.create(
        title=f"{user}-{place_name}",
        review=review_text,
        rating=rating,
        user=user,
        place=place,
    )
    return redirect("https://localhost:3000/review")