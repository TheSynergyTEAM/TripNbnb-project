from django.urls import path
from . import views

app_name = "reviews"

urlpatterns = [
    path("create/", views.write_review),
    path("update/", views.update_review),
    path("delete/", views.delete_review),
]
