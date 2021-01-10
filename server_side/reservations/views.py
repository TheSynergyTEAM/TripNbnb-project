import os
import json
from django.http import JsonResponse
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.shortcuts import render, redirect, reverse
from . import models
from users import models as user_models
from places import models as place_models
from .serializers import ReservationSerializer


# Create your views here.


class ReservationView(viewsets.ModelViewSet):
    serializer_class = ReservationSerializer
    queryset = models.Reservation.objects.all()
    print()


@method_decorator(csrf_exempt, name="dispatch")
def reservation_confirm(request, id):

    received_json_data = json.loads(request.body.decode("utf-8"))
    print(received_json_data)
    hotel_pk = received_json_data.get("place").get("id")
    hotel = place_models.Place.objects.get(pk=hotel_pk)

    guest_pk = received_json_data.get("user").get("id")
    guest = user_models.User.objects.get(pk=guest_pk)

    room = received_json_data.get("room")
    room_type = room.get("name")
    price = room.get("price")
    number_of_people = received_json_data.get("peopleCount")

    date = received_json_data.get("date")
    check_in = date.get("checkIn")
    check_out = date.get("checkeOut")

    # case 1: a room is booked before the check_in date, and checks out after the requested check_in date
    case_1 = models.Reservation.objects.filter(room=room, check_in__lte=check_in, check_out__gte=check_in).exists()
    # case 2: a room is booked before the requested check_out date and check_out date is after requested check_out date
    case_2 = models.Reservation.objects.filter(room=room, check_in__lte=check_out, check_out__gte=check_out).exists()
    # case 3: a room is booked after the requested check_in date and check_out date is before requested check_out date
    case_3 = models.Reservation.objects.filter(room=room, check_in__gte=check_in, check_out__lte=check_out).exists()

    if case_1 or case_2 or case_3: # 이미 예약된 경우
        print("예약이 불가능합니다.")
        #return redirect("http://localhost:3000") //맵으로 돌아가기
    else:  # 예약 가능
        reservation = models.Reservation.objects.create(
            hotel=f"{hotel}", #숙박업소 장소정보 필요
            guest=f"{guest}",
            price=price,
            room_type=room_type,
            check_in=check_in,
            check_out=check_out,
            number_of_people=number_of_people,
        )

  #  return JsonResponse(request) #확실히 정하지 x