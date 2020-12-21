import os
from rest_framework import viewsets  # add this
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.generic import ListView, DetailView, View
from django.shortcuts import render, redirect, reverse
from . import models
from .serializers import PlaceSerializer

# Create your views here.


class PlaceView(viewsets.ModelViewSet):  # add this
    serializer_class = PlaceSerializer  # add this
    queryset = models.Place.objects.all()
    print()


@method_decorator(csrf_exempt, name="dispatch")
def placeview(request):
    received_json_data = json.loads(request.body.decode("utf-8"))
    print(received_json_data)
    pk = received_json_data.get("id")
    return redirect("https://localhost:3000/map")
