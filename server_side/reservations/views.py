import os
import json
from django.http import JsonResponse, HttpResponse
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


@method_decorator(csrf_exempt, name = "dispatch")
def reservation_check(request, id):
    """예약상황을 확인하기 위한 함수"""

    reservation_json = {  # client로 전송할 예약정보 형태
        "data": [],
    }

    places_data = request.GET.get("place")  # get json data from client
    date_data = request.GET.get("date")
    room_data = request.GET.get("room")
    user_data = request.GET.get("user")
    properties = user_data.get("properties")
    nickname = properties.get("nickname")

    place = place_models.Place.objects.get(
        contentid = id
    )  # <place id from client = place id from place model> 객체 얻어오기

    try:
        reservation = place.reservation.filter(
            contentid = id)  # 전달되어온 장소 id와 일치하는 reservation 정보 얻어오기

        # 예약상황을 프론트쪽에 전달하기 위한 json 데이터 생성
        guest = user_models.User.objects.get(username = nickname)  # 유저 정보
        reservation_json["data"].append(
                    {
                        "date": {   # 날짜 정보
                            "checkIn" : str(reservation.check_in),
                            "checkOut": str(reservation.check_out),
                        },
                        "room": {   # 방 정보
                            "name" : str(reservation.room_type),
                            "price" : int(reservation.price),
                        },
                        "guest" : { # 예약자 정보
                            "id" : str(guest.pk),
                            "nickname" : str(guest.username),
                        },
                        "peopleCount" : int(reservation.number_of_people),  # 인원정보
                    }
                )
    except models.Place.DoesNotExist:  # 장소 정보가 존재하지 않을 경우
        #------------json data 얻어오기------------
        place_name = places_data.get("place_name")
        place_contentid = places_data.get("id")
        place_address = places_data.get("address_name")
        place_mapx = places_data.get("x")
        place_mapy = places_data.get("y")

        # 장소정보 저장하기
        place = place_models.Place.objects.create(
            name = place_name,
            contentid = place_contentid,
            place_city = place.city,
            address = place_address,
            mapx = place_mapx,
            mapy = place_mapy,
        )

    return JsonResponse(reservation_json)  # reservation 정보 return


@method_decorator(csrf_exempt, name = "dispatch")
def reservation_confirm(request):
    """예약을 진행하기 위한 함수(전제 : 장소 정보 존재)"""

    # get json data from client
    received_json_data = json.loads(request.body.decode("utf-8"))
    print(received_json_data)

    # place 정보
    hotel = received_json_data.get("place")
    hotel_id = hotel.get("id")
    hotel_address = hotel.get("address_name")
    hotel_mapx = hotel.get("x")
    hotel_mapy = hotel.get("y")
    hotel_name = hotel.get("place_name")

    try:
        place = place_models.Place.objects.get(contentid = hotel_id)
    except place_models.Place.DoesNotExist:
        place = place_models.Place.objects.create(
            name = hotel_name,
            contentid = hotel_id,
            address = hotel_address,
            mapx = hotel_mapx,
            mapy = hotel_mapy,
        )

    # user 정보
    guest_pk = received_json_data.get("user").get("id")
    guest = user_models.User.objects.get(pk = guest_pk)

    # room 정보
    room = received_json_data.get("room")
    room_type = room.get("type")
    price = received_json_data.get("price")
    totalPrice = price.get("pay")
    stay = price.get("stay")
    number_of_people = received_json_data.get("peopleCount")

    # 날짜 정보
    date = received_json_data.get("date")
    check_in = date.get("checkIn")
    check_out = date.get("checkOut")

    # 예약내역 저장
    reservation = models.Reservation.objects.create(
        hotel = place,  # 숙박업소명
        guest = guest,  # 예약자명
        price = totalPrice,  # 가격
        room_type = room_type,  # 방 종류
        check_in = check_in,  # 체크인 날짜
        check_out = check_out,  # 체크아웃 날짜
        number_of_people = number_of_people,  # 예약 인원
    )

    response = HttpResponse()
    response.status_code = 201

    return response
