from django.http import HttpResponse
from django.views.generic import View
from django.shortcuts import render
from users import models as users_model

# Create your views here.


class HomeView(View):
    def get(self, request):
        return render(request, "base.html")
