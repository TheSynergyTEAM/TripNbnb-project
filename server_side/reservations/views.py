import os
import json
from datetime import datetime
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


@method_decorator(csrf_exempt, name="dispatch")
def reservation_check_test(request, id):
    response = HttpResponse()

    body = json.loads(request.body.decode("utf-8"))

    check_in = datetime.strptime(body.get("checkIn"), '%Y-%M-%d')
    check_out = datetime.strptime(body.get("checkOut"), '%Y-%M-%d')

    print(check_in, check_out)

    try:
        place = place_models.Place.objects.get(contentid=id)
        reservation_json = {"data": []}
        reservation = models.Reservation.objects.filter(
            hotel__id__exact=place.id)

        for data in reservation.values():
            print(data)

        response.status_code = 200

        return JsonResponse(reservation_json)
    except place_models.Place.DoesNotExist:
        print('플레이스 없음')
        response.status_code = 401
        return response


@method_decorator(csrf_exempt, name="dispatch")
def reservation_check(request, id):
    """예약상황을 확인하기 위한 함수"""

    reservation_json = {  # client로 전송할 예약정보 형태
        "data": [],
    }
 #   date_data = request.GET.get("date")
 #   room_data = request.GET.get("room")

    place = place_models.Place.objects.get(
        contentid=id
    )  # <place id from client = place id from place model> 객체 얻어오기

    try:
        reservation_db = place.reservation.filter(
            contentid=id)  # 전달되어온 장소 id와 일치하는 reservation 정보 얻어오기

        # 예약상황을 프론트쪽에 전달하기 위한 json 데이터 생성
        for reservation in reservation_db:
            reservation_json["data"].append(
                {
                    "checkIn" : str(reservation.check_in),
                    "checkOut": str(reservation.check_out),
                    "room" : str(reservation.room_type),
                }
            )
        
        return JsonResponse(reservation_json)
    except models.Place.DoesNotExist:  # 장소 정보가 존재하지 않을 경우
    #    reservation_json["data"].append(
    #        {
    #            "message" : "예약 정보가 없습니다."
    #        }
    #    )
        response = HttpResponse("예약 정보가 없습니다.");
        response.status_code = 400
        return response


@method_decorator(csrf_exempt, name="dispatch")
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
        place = place_models.Place.objects.get(contentid=hotel_id)
    except place_models.Place.DoesNotExist:
        place = place_models.Place.objects.create(
            name=hotel_name,
            contentid=hotel_id,
            address=hotel_address,
            mapx=hotel_mapx,
            mapy=hotel_mapy,
        )

    # user 정보
    guest_pk = received_json_data.get("user").get("id")
    guest = user_models.User.objects.get(pk=guest_pk)

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
        hotel=place,  # 숙박업소명
        guest=guest,  # 예약자명
        price=totalPrice,  # 가격
        room_type=room_type,  # 방 종류
        check_in=check_in,  # 체크인 날짜
        check_out=check_out,  # 체크아웃 날짜
        number_of_people=number_of_people,  # 예약 인원
    )

    response = HttpResponse()
    response.status_code = 201

    return response
