from django.urls import path
from . import views

app_name = "lists"

urlpatterns = [
    path("create/", views.create_list, name="listview"),
]
