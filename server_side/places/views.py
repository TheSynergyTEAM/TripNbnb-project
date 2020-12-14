from django.views.generic import ListView, DetailView, View
from django.shortcuts import render
from . import models

# Create your views here.


class E:
    pass


class PlaceView(DetailView):
    """ RoomView Definition """

    model = models.Place


class SearchView(View):
    pass