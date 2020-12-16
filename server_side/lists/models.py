from django.db import models

# Create your models here.

class MyPlace(models.Model):
    user = models.ForeignKey(
        "users.User", related_name="list_place_u", on_delete=models.CASCADE
    )
    place = models.ManyToManyField(
        "places.Place", related_name="list_place_p"
    )



class MyReview(models.Model):
    user = models.ForeignKey(
        "users.User", related_name="list_review_u", on_delete=models.CASCADE
    )
    review = models.ForeignKey(
        "reviews.Review", related_name="list_review_r", on_delete=models.CASCADE
    )
