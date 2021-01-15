import os
import json
from rest_framework import viewsets
from django.http import JsonResponse
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
    review.save()
    all_review = models.Review.objects.all()
    
    all_review_json = {
        "data" : [],
    }
    for created_review in all_review:
        if created_review.place_id == place.id:
            review_user = user_models.User.objects.get(username=created_review.user)
            all_review_json["data"].append(
                {
                    "username": str(created_review.user),
                    "user_id" : str(review_user.id),
                    "user_profile": (review_user.profile_img.url),
                    "review_id" : str(created_review.id),
                    "review": str(created_review.review),
                    "rating": str(created_review.rating),
                    "created": str(created_review.created),
                }
            )
    
    return JsonResponse(all_review_json)

@method_decorator(csrf_exempt, name="dispatch")
def update_review(request):
    received_json_data = json.loads(request.body.decode("utf-8"))
    print(f"update call : {received_json_data}")
    review_id = received_json_data.get("review_id")
    review = models.Review.objects.get(id=review_id)
    content = received_json_data.get("content")
    review.review = content
    review.save()
    updated_review_json = {
        "review_id": review_id,
        "review": str(review.review),
    }

    return JsonResponse(updated_review_json)

@method_decorator(csrf_exempt, name="dispatch")
def delete_review(request):
    received_json_data = json.loads(request.body.decode("utf-8"))
    review_id = received_json_data.get("review_id")
    review = models.Review.objects.get(id=review_id)
    review.delete()
    return redirect("http://localhost:3000")