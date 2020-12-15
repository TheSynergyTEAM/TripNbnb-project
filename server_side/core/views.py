from django.http import HttpResponse
from django.views.generic import View
from django.shortcuts import render
from users import models as users_model

# Create your views here.


class HomeView(View):
    def get(self, request):
        return render(request, "base.html")


def get_search_kw(request):
    search_value = request.GET.get("search_value")
    return render(request, "base.html", {"search_value": search_value})