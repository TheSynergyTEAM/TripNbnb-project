import os
import json
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
