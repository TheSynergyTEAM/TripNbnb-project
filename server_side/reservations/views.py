import os
import json
from datetime import datetime
from django.utils.dateformat import DateFormat
from django.http import JsonResponse, HttpResponse
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.shortcuts import render, redirect, reverse, get_object_or_404
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
def reservation_check(request,id):
    """예약상황을 확인하기 위한 함수"""
    received_json_data = json.loads(request.body.decode("utf-8"))
    hotel = received_json_data.get("place")
    hotel_id = hotel.get("id")
    hotel_address = hotel.get("address_name")
    hotel_mapx = hotel.get("x")
    hotel_mapy = hotel.get("y")
    hotel_name = hotel.get("place_name")

    place = place_models.Place.objects.get_or_none(contentid=hotel_id)  # 전달되어 온 id와 일치하는 장소 객체 얻어오기

    if place is None:   # 장소 정보가 존재하지 않을 경우
        place = place_models.Place.objects.create(
            name=hotel_name,
            contentid=hotel_id,
            address=hotel_address,
            mapx=hotel_mapx,
            mapy=hotel_mapy,
        )
            
        return HttpResponse(status=204)
        # 장소 정보 존재할 경우
        # new_체크인, new_체크아웃 날짜 저장
    check_in_date = datetime.strptime(received_json_data.get("checkIn"), '%Y-%m-%d')
    check_out_date = datetime.strptime(received_json_data.get("checkOut"), '%Y-%m-%d')

    # 방타입 저장
    room_type = received_json_data.get("roomType")
    #room_type = room.get("room")
    room_type_db = place.reservation.filter(room_type=room_type)

    # if room_type_db is None:   # 현재 방타입으로 예약된 방이 없다면(예약가능)
    if not len(room_type_db):
        return HttpResponse(status=204)
    else :
        # 방타입과 일치하는 예약이 존재한다면
        # -----예약 가능한 조건들-----
        # 1. 체크인 : db_체크아웃 <= new_체크인, db_체크인 >= 오늘날짜
        # 2. 체크아웃 : db_체크인 >= new_체크아웃, db_체크아웃 > 오늘날짜
        today = DateFormat(datetime.now()).format('Y-m-d')
        date_db = place.reservation.filter(room_type=room_type, check_out__gte=check_in_date, check_in__lte=check_out_date).exclude(check_in__lt=today, check_out__lte=today)
    
        print(date_db)

        if date_db is None: # 예약내역 無, 예약 가능한 경우
            return HttpResponse(status=204)
        else:   # 예약내역 有, 예약 불가능할 경우
             return HttpResponse(status=409)


@method_decorator(csrf_exempt, name="dispatch")
def reservation_confirm(request):
    """예약을 진행하기 위한 함수(전제 : 장소 정보 존재)"""

    # get json data from client
    received_json_data = json.loads(request.body.decode("utf-8"))

    # place 정보
    hotel_pk = received_json_data.get("place").get("id")
    hotel = place_models.Place.objects.get(contentid=hotel_pk)

    # user 정보
    guest_pk = received_json_data.get("user").get("id")
    guest = user_models.User.objects.get(pk=guest_pk)

    # 날짜 정보
    date = received_json_data.get("date")
    check_in = date.get("checkIn")
    check_out = date.get("checkOut")
    stay_in = datetime.strptime(check_in, '%Y-%m-%d')
    stay_out = datetime.strptime(check_out, '%Y-%m-%d')
    stay = (stay_out-stay_in).days

    # room 정보
    room = received_json_data.get("room")
    number_of_people = received_json_data.get("peopleCount")
    room_limit = room.get("limit")
    room_type = room.get("type")
    room_price = room.get("price")
    pay_per_people = (number_of_people-room_limit)*room_price if number_of_people > room_limit else 0
    price = room_price*stay + pay_per_people

    # 예약내역 저장
    reservation = models.Reservation.objects.create(
        hotel=hotel,  # 숙박업소 정보
        guest=guest,  # 예약자 정보
        price=price,  # 가격
        room_type=room_type,  # 방 종류
        check_in=check_in,  # 체크인 날짜
        check_out=check_out,  # 체크아웃 날짜
        number_of_people=number_of_people,  # 예약 인원
    )

    return HttpResponse(status=201)


@method_decorator(csrf_exempt, name="dispatch")
def reservation_update(request, id):
    """예약내역 수정"""
    
    reservation = models.Reservation.objects.get(pk=id)
    received_json_data = json.loads(request.body.decode("utf-8"))

    date = received_json_data.get("date")
    check_in = date.get("checkIn")
    check_out = date.get("checkOut")

    room = received_json_data.get("room")
    room_type = room.get("type")
    price = received_json_data.get("price")

    number_of_people = received_json_data.get("peopleCount")

    reservation.update(
        price=price,  # 가격
        room_type=room_type,  # 방 종류
        check_in=check_in,  # 체크인 날짜
        check_out=check_out,  # 체크아웃 날짜
        number_of_people=number_of_people,  # 예약 인원
    )

    return HttpResponse(status=201)


@method_decorator(csrf_exempt, name="dispatch")
def reservation_cancel(request, id):
    """예약 취소"""

    reservation = models.Reservation.objects.get(pk=id)
    reservation.delete()

    return HttpResponse(status=200)