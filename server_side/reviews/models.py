from django.db import models
from core import models as core_models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.


class Review(core_models.TimeStampedModel):
    """Review Model Definition"""

    title = models.TextField(null=True)
    review = models.TextField()
    rating = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
    user = models.ForeignKey(
        "users.User", related_name="reviews_u", on_delete=models.CASCADE
    )
    place = models.ForeignKey(
        "places.Place", related_name="reviews_p", on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.review}-{self.user}"