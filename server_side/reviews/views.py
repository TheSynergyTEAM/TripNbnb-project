import os
import json
from rest_framework import viewsets  # add this
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.generic import ListView, DetailView, View
from django.shortcuts import render, redirect, reverse
from . import models
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
    # required data
    # name, contentid, city ,address ,mapx ,mapy ,writer ,place_img
    return redirect("https://localhost:3000/review")