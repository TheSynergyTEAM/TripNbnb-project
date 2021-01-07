from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = "users"

urlpatterns = [
    path("login/", views.kakao_login, name="login"),
    path("unlink/", views.kakao_unlink, name="unlink"),
    path("<int:pk>", views.get_profile, name="proflile"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
