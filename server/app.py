from config import app, api
from flask_restful import Resource

from models import Instructor


class Instructors(Resource):
    def get(self):
        instructors = [instructor.to_dict() for instructor in Instructor.query.all()]
        return instructors, 200

api.add_resource(Instructors, '/instructors')

if __name__ == "__main__":
  app.run(port=5555, debug=True)
