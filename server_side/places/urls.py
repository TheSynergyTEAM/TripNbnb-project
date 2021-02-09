from django.urls import path
from . import views

app_name = "places"

urlpatterns = [
    path("<int:id>/", views.place_view, name="place"),
    path("image/", views.search_place_view),
]
