from django.db import models
from core import models as core_models

# Create your models here.

class Reservation(models.Model):
    """Reservation Model Definition"""

    room = models.ForeignKey(
        "places.Place", related_name="reservation", on_delete=models.CASCADE)
    guest = models.ForeignKey(
        "users.User", related_name="reservation", on_delete=models.CASCADE)
    price = models.IntegerField()
    check_in = models.DateField()
    check_out = models.DateField()
    is_reserved = models.BooleanField(default=False)
    number_of_people = models.PositiveIntegerField()

 #   def __str__(self):
 #       return self.name