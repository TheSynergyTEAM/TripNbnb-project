"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from users import views as users_views
from places import views as places_views
from reviews import views as reviews_views
from lists import views as lists_views
from reservations import views as reservations_views

router = routers.DefaultRouter()
router.register(r"users", users_views.UserView, "users")
router.register(r"places", places_views.PlaceView, "places")
router.register(r"reviews", reviews_views.ReviewView, "reviews")
router.register(r"lists", lists_views.ListView, "lists")
router.register(r"reservations", reservations_views.ReservationView, "reservations")

urlpatterns = [
    path("api/", include(router.urls)),
    path("places/", include("places.urls", namespace="places")),
    path("reviews/", include("reviews.urls", namespace="reviews")),
    path("users/", include("users.urls", namespace="users")),
    path("lists/", include("lists.urls", namespace="lists")),
    path("reservations/", include("reservations.urls", namespace="reservations")),
    path("", include("core.urls", namespace="core")),
    path("admin/", admin.site.urls),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)