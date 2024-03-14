from config import app, api, db
from flask_restful import Resource
from flask import request, session

from models import Instructor, User, Lesson


class Signup(Resource):
   def post(self):
      json = request.get_json()

      user=User(
         username=json.get('username'),
         email=json.get('email'),
         age=json.get('age'),
         primary_instrument=json.get('primary_instrument')
      )

      user.password_hash = json['password']

      try:
         db.session.add(user)
         db.session.commit()

         session['user_id'] = user.id

         response_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'age': user.age,
            'primary_instrument': user.primary_instrument
         }

         return response_data, 201
      
      except:
         error={'error': 'invalid input'}
         return error, 422
      
api.add_resource(Signup, '/api/signup', endpoint='signup')

class CheckSession(Resource):
   def get(self):
      user_id=session['user_id']
      try:
         user=User.query.filter(User.id==user_id).first()
         return user.to_dict(), 200
      except:
         error = {'error': 'invalid email or password'}
         return error, 401
      
api.add_resource(CheckSession, '/api/check_session', endpoint='check_session')

class Login(Resource):
   def post(self):

      # json=request.get_json()
      # user=User.query.filter(User.email==json['email']).first()
      # if user:
      #    if user.authenticate(json.get('password')):
      #       session['user_id']=user.id
      #       return user.to_dict(), 200
      #    else:
      #       return {'error': 'invalid'}
      try:
         email=request.get_json()['email']
         user=User.query.filter(User.email==email).first()
         password=request.get_json()['password']
         if user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
      except:
         error = {'error': 'invalid email or password'}
         return error, 401
      
api.add_resource(Login, '/api/login', endpoint='login')

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
