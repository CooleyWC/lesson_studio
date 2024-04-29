# The Lesson Studio :musical_note:

## Description

This application allows students to schedule music lessons with instructors.

<img src='client/public/readmeImages/landing_page.png' alt='landing_page' width='400'>

## Usage

- npm install
- pipenv install && pipenv shell
- _to setup the database:_
- flask db init
- flask migrate -m _'comment'_
- flask db upgrade
- _to seed the database:_
- python seed.py
- _to run the application:_
- cd into the server then run python app.py
- in another terminal run: npm run dev --prefix client

# Faculty

Without logging in, the user may view the music school Faculty.

<img src='client/public/readmeImages/faculty.png' alt='faculty' width='400'>

#### Login

A student can create an account or login if they already have an account.

<img src='client/public/readmeImages/login-createaccount.png' alt='login' width='400'>

#### Dashboard

Once logged in, the student can view their profile, associated instructors, and scheduled lessons.

<img src='client/public/readmeImages/dashboard.png' alt='dashboard' width='400'>

#### Scheduling Form

Lessons can be scheduled using this form.

<img src='client/public/readmeImages/lesson_form.png' alt='lesson form' width='400'>

#### Student Feedback

If a student enjoyed a lesson in particular, they may click the thumb icon.

<img src='client/public/readmeImages/thumbup.png' alt='thumb up' width='400'>

#### Instructor

A student also has the ability to create a new instructor.

<img src='client/public/readmeImages/instructor.png' alt='instructor' width='400'>

## Support

If you have any questions, you can find me on Discord: cooleywc

## Acknowledgement

Application built using Vite + React and Material UI. Included application images are from unsplash.com
