from config import app, api, db
from flask_restful import Resource
from flask import request, session
from datetime import datetime

from models import Instructor, User, Lesson


class Signup(Resource):
   def post(self):
      json = request.get_json()

      try:
         user=User(
            username=json.get('username'),
            email=json.get('email'),
            age=json.get('age'),
            primary_instrument=json.get('primary_instrument')
         )

         user.password_hash = json['password']

         db.session.add(user)
         db.session.commit()

         session['user_id'] = user.id

         return user.to_dict(), 201
      
      except:
         error={'error': 'invalid input'}
         return error, 422
      
api.add_resource(Signup, '/api/signup', endpoint='signup')

class CheckSession(Resource):
   def get(self):
      # user_id=session['user_id']
      try:
         user_id=session['user_id']
         user=User.query.filter(User.id==user_id).first()
         return user.to_dict(), 200
      except:
         error = {'error': 'error logging in'}
         return error, 401
      
api.add_resource(CheckSession, '/api/check_session', endpoint='check_session')

class Login(Resource):
   def post(self):
      try:
         email=request.get_json()['email']
         user=User.query.filter(User.email==email).first()
         password=request.get_json()['password']
         if user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
      except:
         error = {'error': 'you are logged out'}
         return error, 401
      
api.add_resource(Login, '/api/login', endpoint='login')

class Logout(Resource):
   def delete(self):
      user_id=session['user_id']
      if user_id:
         session['user_id'] = None
         return {}, 204
      else:
         error = {'error': 'not authorized'}
         return error, 401
      
api.add_resource(Logout, '/api/logout', endpoint='logout')

class LessonByID(Resource):
   def get(self, id):
      try: 
         lesson = Lesson.query.filter(Lesson.id == id).first()
         lesson_dict = lesson.to_dict()

         return lesson_dict, 200
      except:
         error={'error': 'problem getting the lesson'}
         return error, 400
      
   def patch(self, id):
      data = request.get_json()
      if data:
         try:
            lesson = Lesson.query.filter(Lesson.id == id).first()

            for attr in data:
               
               if attr == 'date_time':
           
                  date_str = data.get(attr)
                  print(date_str)
                  print('')
                  print('')

                  format = '%Y,%m,%d,%H,%M,%S'
                  print(f'format: {format}')

                  datetime_str = datetime.strptime(date_str, format)
                  # to reverse, do (Pdb) datetime_str.strftime("%A %B %d %Y")
                  # output = 'Monday April 01 2024'

                  try:
                     setattr(lesson, attr, datetime_str)
                  except:
                     error = {"error": "incorrect date format"}
               else:

                  setattr(lesson, attr, data.get(attr))

            db.session.add(lesson)
            db.session.commit()

            lesson_dict = lesson.to_dict()

            return lesson_dict, 200  
      
         except:
            error = {'error': 'there was a problem updating this lesson'}
            return error, 422
      else:
         error = {'error': 'there was a problem updating this lesson'}
         return error, 422
      
   def delete(self, id):
      try:
         lesson = Lesson.query.filter(Lesson.id == id).first()
         print(lesson)

         db.session.delete(lesson)
         db.session.commit()


         return {"message": "the lesson was successfully deleted"}, 200
      
      except:
         error = {"error": "there was a problem deleting the lesson"}
         return error, 422
      
         
   
api.add_resource(LessonByID, '/api/lesson_by_id/<int:id>')

class UserByID(Resource):
   def get(self, id):
      try:
         user = User.query.filter(User.id == id).first()
         user_dict = user.to_dict()

         return user_dict, 200
      
      except:
         error = {"error": "no user found"}
         return error, 400
      
   def patch(self, id):
      try:
         data = request.get_json()

         user = User.query.filter(User.id == id).first()

         for attr in data:
            if attr == 'instructors':
               instructors_list = data.get(attr)
               try:
                  print(f'original attribute: {user.instructors}')
                  print(f'new instructor list {instructors_list}')
                  setattr(user, attr, instructors_list)
                  
               except:
                  error = {"error": "there was an error updating the instructors attribute"}
                  return error
            else:
               setattr(user, attr, data.get(attr))
         
         db.session.commit()

         user_dict = user.to_dict()

         return user_dict, 200

      except:
         error = {"error": "there was an error updating the instructors attribute"}
         return error, 422

api.add_resource(UserByID, '/api/user_by_id/<int:id>')


class Instructors(Resource):
    def get(self):
        instructors = [instructor.to_dict() for instructor in Instructor.query.all()]
        return instructors, 200

api.add_resource(Instructors, '/api/instructors')

class Users(Resource):
   def get(self):
      users = [user.to_dict() for user in User.query.all()]
      return users, 200

api.add_resource(Users, '/api/users')

class Lessons(Resource):
   def get(self):
      lessons = [lesson.to_dict() for lesson in Lesson.query.all()]
      return lessons, 200
   
api.add_resource(Lessons, '/api/lessons')




if __name__ == "__main__":
  app.run(port=5555, debug=True)
