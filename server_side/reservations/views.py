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
def reservation_check(request, id):
    """예약상황을 확인하기 위한 함수"""
    reservation_json = {
      "data": [],
    }

    place = place_models.Place.objects.get(contentid=id)   # 전달되어온 장소 id와 일치하는 place 모델에 저장된 장소 id 검색 후 일치하는 객체 얻어오기

    places = request.GET.get("place") # 전달되어 온 데이터 사용 위한 저장
    date = request.GET.get("date")
    room = request.GET.get("room")
    user = request.GET.get("user")
    
    try:

        hotel = place.reservation.get()  # place 객체의 reservation 내역 불러오기
        reservation = models.Reservation.objects.filter(hotel)   # 얻어온 place 객체 정보와 일치하는 reservation 객체(예약내역) 얻어오기
        
        # 예약상황을 프론트쪽에 전달하기 위한 json 데이터 생성
        guest = user_models.User.objects.get(username=reservation.guest) # 유저 정보 얻어오기
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
    except models.Place.DoesNotExist:   # 장소 정보가 존재하지 않을 경우
        print("장소 정보가 존재하지 않습니다.")

        place_name = places.get("place_name")
        place_contentid = places.get("id")
        place_address = places.get("address_name")
        place_mapx = places.get("x")
        place_mapy = places.get("y")

        place = place_models.Place.objects.create(
            name= place_name,
            contentid= place_contentid,
            place_city = place.city,
            address= place_address,
            mapx= place_mapx,
            mapy= place_mapy,
        )

    return JsonResponse(reservation_json) # reservation 정보 return


@method_decorator(csrf_exempt, name="dispatch")
def reservation_confirm(request):
    """예약을 진행하기 위한 함수"""
    received_json_data = json.loads(request.body.decode("utf-8"))
    print(received_json_data)
    hotel = received_json_data.get("place")
    hotel_name = hotel.get("place_name")
    hotel_contentid = hotel.get("id")
    hotel_city = hotel.get("")
    hotel_address = hotel.get("address_name")
    hotel_mapx = hotel.get("mapx")
    hotel_mapy = hotel.get("mapy")

    guest_pk = received_json_data.get("user")
    guest = user_models.User.objects.get(pk=guest_pk)

    room = received_json_data.get("room")
    room_type = room.get("name")
    price = room.get("price")
    number_of_people = received_json_data.get("peopleCount")

    date = received_json_data.get("date")
    check_in = date.get("checkIn")
    check_out = date.get("checkeOut")

    if case_1 or case_2 or case_3: # 이미 예약된 경우
        print("예약이 불가능합니다.")
        #return redirect("http://localhost:3000/map") //맵으로 돌아가기
    else:  # 예약 가능
        reservation = models.Reservation.objects.create(
            hotel=f"{hotel}",   # 숙박업소명
            guest=f"{guest}",   # 예약자명
            price=price,    # 가격
            room_type=room_type,    # 방 종류
            check_in=check_in,  # 체크인 날짜
            check_out=check_out,    # 체크아웃 날짜
            number_of_people=number_of_people,  # 예약 인원
        )

  #  return JsonResponse(request) #확실히 정하지 x