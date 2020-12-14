from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    """Custom User Model
    https://docs.djangoproject.com/en/3.1/topics/auth/customizing/
    """

    GENDER_MALE = "male"
    GENDER_FEMALE = "female"
    GENDER_CHOICES = (
        (GENDER_MALE, "Male"),
        (GENDER_FEMALE, "Female"),
    )

    profile_img = models.ImageField(blank=True)
    gender = models.CharField(
        choices=GENDER_CHOICES, default=GENDER_FEMALE, max_length=10, blank=True
    )
    biography = models.TextField()
    birthdate = models.DateField(blank=True, null=True)
