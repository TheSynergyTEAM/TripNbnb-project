import os
import json
from rest_framework import viewsets  # add this
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.shortcuts import render, redirect, reverse
from . import models
from .serializers import ListSerializer
from users import models as users_models
from django.http import JsonResponse


# Create your views here.


class ListView(viewsets.ModelViewSet):
    serializer_class = ListSerializer
    queryset = models.List.objects.all()
    print()


@method_decorator(csrf_exempt, name="dispatch")
def listview(request):

    username = request.GET.get("username")
    try:
        user = users_models.User.objects.get(username=username)
        user_list = user.list
        data = json.dumps(user_list)
        # Need to do more
    except:
        pass
    return JsonResponse(data, safe=False)
    # In order to allow non-dict objects to be serialized set the safe parameter to False.
