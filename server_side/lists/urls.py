from django.urls import path
from . import views

app_name = "lists"

urlpatterns = [
    path("<int:pk>/", views.list_view),
    path("create/", views.create_list,),
    path("delete/", views.delete_list),
]
