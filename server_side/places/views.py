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

# Create your views here.


class PlaceView(viewsets.ModelViewSet):
    serializer_class = PlaceSerializer
    queryset = models.Place.objects.all()
    print()


@method_decorator(csrf_exempt, name = "dispatch")
def place_view(request, id):
    place_json = {
        "data": [],
        "images": [],
    }
    place_name = request.GET.get("name")
    try:
        places = models.Place.objects.filter(contentid = id)
        for place in places:
            reviews = place.reviews_p.all(
            )  # 전달되어 온 id와 일치하는 place model을 불러오고 그 place model의 데이터를 모두 가져오기
            for review in reviews:
                review_user = user_models.User.objects.get(
                    username = review.user
                )  #review를 작성한 user와 일치하는 user의 정보를 가져오기
                place_json["data"].append({
                    "username":
                    str(review.user),
                    "user_id":
                    str(review_user.id),
                    "user_profile": (review_user.profile_img.url),
                    "review_id":
                    review.id,
                    "review":
                    str(review.review),
                    "rating":
                    str(review.rating),
                    "created":
                    str(review.created),
                })
    except models.Place.DoesNotExist:
        pass
    images = get_images(str(place_name))
    for img in images:
        place_json["images"].append(img["link"])

    return JsonResponse(place_json)


def get_images(keyword, limit = 20):
    client_id = os.environ.get("NAVER_CLIENT_ID", "1w4UBQhhzX6BV8IMhq7t")
    client_secret = os.environ.get("NAVER_CLIENT_SECRET", "8_b5DV1kMO")
    encText = urllib.request.quote(keyword)
    url = "https://openapi.naver.com/v1/search/image?query=" + encText + "&display=" + str(
        limit)
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
        print("Error Code:" + str(rescode))
        return
