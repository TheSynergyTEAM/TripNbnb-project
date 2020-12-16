import os
from django.views.generic import ListView, DetailView, View
from django.shortcuts import render, redirect, reverse
from . import models

# Create your views here.

# Further task : change search to SearchView(Formview)
def search(request):
    search_value = request.GET.get("search_value")
    return render(
        request,
        "places/search_test.html",
        {"appkey": os.environ.get("KAKAO_ID"), "keyword": search_value},
    )


class PlaceView(DetailView):
    """ RoomView Definition """

    model = models.Place
