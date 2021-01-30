# **TripNbnb Server**

## Setup
>The first thing to do is to clone the repository:

    $ git clone https://github.com/Tripandbnb/TripNbnb-project.git
    $ cd server_side

>Create a virtual environment to install dependencies in and activate it:
    
    $ pipenv install django

> Once pip has finished downloading the dependencies

> Start server

    $ (env)$ python manage.py runserver


## Main features
- **Users**
<br/>
Users model<br/>
Sign up & Sign in : Kakao Auth
<br/>Data field
    - username : user's unique name
    - profile image : Bringing user's profile image from Kakao Account

- **Places**
<br/>
Place information : Kakao Map API
<br/>Data field
    - contentid : places' unique id
    - name
    - mapx, mapy : coordinates in map
    - place image : Bringing places' images from NAVER Image Search API

- **Reviews**
<br/>
Place Review with rating
<br/>Data field
    - review : places' own review
    - rating : User can make place's rating fron 1 to 5
- **Reservations**
<br/>
User can book accomodations<br/>
Check reservation validaiton
Confirm reservation
<br/>Data field
    - hotel : place to book by user 
    - name : hotel's own name
    - price : hotel's price
    - checkin / checkout : Date info
    - is_reserved 
    - number_of_people

- **Lists**
<br/>
Database contains Users favourite places
<br/>Data field
    - user : User who make a list of places
    - places

