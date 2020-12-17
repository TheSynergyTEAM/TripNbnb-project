# **TripNbnb Server**

## Setup
>The first thing to do is to clone the repository:

    $ git clone https://github.com/Tripandbnb/TripNbnb-project.git
    $ cd server_side

>Create a virtual environment to install dependencies in and activate it:
    
    $ pipenv install django

>Once pip has finished downloading the dependencies:

    $ (env)$ python manage.py runserver

>And navigate to http://127.0.0.1:8000/.


## Main features

- Separated dev and production settings
- Example app with custom user model
- User registration and logging in as demo
- Separated requirements files
- SQLite by default if no env variable is set

## To do
- Review Admin, Place Admin, List Admin
- Add Signup feature
- Add Login feature not with using Social API
- Detail View of user profile, places' detail, lists of places and reviews. 

