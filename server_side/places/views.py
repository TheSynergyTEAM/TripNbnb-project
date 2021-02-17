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
from users import models as user_models
from .serializers import PlaceSerializer
from django.views.decorators.csrf import csrf_exempt
from django.forms import URLField
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError

# Create your views here.


class PlaceView(viewsets.ModelViewSet):
  serializer_class = PlaceSerializer
  queryset = models.Place.objects.all()
  print()

@method_decorator(csrf_exempt, name="dispatch")
def place_view(request, id):
  place_json = {
      "data": [],
      "images": [],
  }
  place_name = request.GET.get("name")
  place = models.Place.objects.get_or_none(contentid=id)
  if not place:
    pass
  else:
      reviews = place.reviews_p.all() 
      for review in reviews:
        review_user = user_models.User.objects.get(username=review.user)
        place_json["data"].append(
            {
                "username": str(review.user),
                "user_id" : str(review_user.id),
                "user_profile": (review_user.profile_img.url),
                "review_id": review.id,
                "review": str(review.review),
                "rating": str(review.rating),
                "created": str(review.created),
            }
        )
  images = get_images(str(place_name))
  if len(images) > 0:
    for img in images:
      img_link = img["link"]
      validate = URLValidator()
      try:
        validate(img_link)
        place_json["images"].append(img["link"])
      except ValidationError as e:
        print(e)
  return JsonResponse(place_json)

# def validate_url(url):
#     url_form_field = URLField()
#     try:
#         url = url_form_field.clean(url)
#     except ValidationError:
#         return False
#     return True

def get_images(keyword, option=20, scale="all"):
  client_id = os.environ.get("NAVER_CLIENT_ID", "1w4UBQhhzX6BV8IMhq7t")
  client_secret = os.environ.get("NAVER_CLIENT_SECRET", "8_b5DV1kMO")
  encText = urllib.request.quote(keyword)
  url = "https://openapi.naver.com/v1/search/image?query=" + encText + f"&display={option}&sort=sim&filter={scale}"
  url_request = urllib.request.Request(url)
  url_request.add_header("X-Naver-Client-Id", client_id)
  url_request.add_header("X-Naver-Client-Secret", client_secret)
  response = urllib.request.urlopen(url_request)
  rescode = response.getcode()
  print(f"resCode:{rescode}")
  if rescode == 200:
    response_body = response.read()
    received_json_data = json.loads(response_body.decode("utf-8"))
    items = received_json_data.get("items")
    return items
  else:
    print("Error Code:" + str(rescode))
    return

@method_decorator(csrf_exempt, name="dispatch")
def search_place_view(request):
  places_id = request.GET.get("id")
  places_keyword = request.GET.get("keyword")
  places_id_l = places_id.split(',')
  places_keyword_l = places_keyword.split(',')
  
  result_imgs = list()
  link_list = list()
  for pkl in places_keyword_l:
    # https://github.com/Tripandbnb/TripNbnb-project/issues/15
    # image = get_images(str(pkl), 1, "large")[0]
    # dummy image
    image = { "link": "https://www.kagoshima-kankou.com/image.php?w=770&h=515&f=/db_img/cl_img/10244/D0251400458E4E3A7269065F2E4CD105.jpg" }
    result_imgs.append(image)
  
  result_json = dict()
  for img in result_imgs:
    link = img["link"]
    link_list.append(link)
  for pid, l in zip(places_id_l, link_list):
    place = models.Place.objects.get_or_none(contentid=pid)

    if place is None:
      result_json[pid] = {
        "place_rating" : 0,
        "place_review_cnt" : 0,
        "place_image" : l
      }
    else:
      result_json[pid] = {
        "place_rating" : place.place_rating(),
        "place_review_cnt" : place.review_cnt(),
        "place_image" : l
      }
    
  return JsonResponse(result_json)
  