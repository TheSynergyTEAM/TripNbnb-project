from django.urls import path
from . import views

app_name = "places"

urlpatterns = [
    path("<int:pk>", views.placeview, name="placeview"),
    path("destination", views.tourist_destination_view, name="destinationview"),
]
