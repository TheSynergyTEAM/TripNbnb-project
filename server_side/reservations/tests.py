from django.test import TestCase, Client
from .models import Reservation

# Create your tests here.

class ReservationTest(TestCase):

    def setUp(self):
        client = Client()
        Reservation.objects.create(

        )

    def tearDown(self):
        Reservation.objects.all().delete()
        
    def test_reservation_check(self):
        client = Client()
        
        response = self.client.get('reservations/place/')

    def test_reservation_confirm(self):
        client = Client()
