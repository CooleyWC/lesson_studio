from config import app, api, db
from flask_restful import Resource
from flask import request, session

from models import Instructor, User


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
      
api.add_resource(Signup, '/signup', endpoint='signup')

class Instructors(Resource):
    def get(self):
        instructors = [instructor.to_dict() for instructor in Instructor.query.all()]
        return instructors, 200

api.add_resource(Instructors, '/instructors')

if __name__ == "__main__":
  app.run(port=5555, debug=True)
