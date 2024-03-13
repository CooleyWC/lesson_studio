import os

from config import app, db

from random import randint, choice as rc

from faker import Faker

from app import app

from datetime import datetime
# import datetime

from models import db, Instructor, User, Lesson

if __name__ == "__main__":
  with app.app_context():
      print("Starting seed...")
      # Seed code goes here!
      Instructor.query.delete()
      User.query.delete()
      Lesson.query.delete()

      fake = Faker()
      
      print('adding instructors...')

      drums_1 = Instructor(name=fake.unique.name_female(), email=fake.email(), bio=fake.paragraph(nb_sentences=3), experience=randint(1,25), instrument='drums', photo='https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww')
      guitar_1 = Instructor(name=fake.unique.name_male(), email=fake.email(), bio=fake.paragraph(nb_sentences=3), experience=randint(1,25), instrument='guitar', photo='https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww')
      piano_1 = Instructor(name=fake.unique.name_male(), email=fake.email(), bio=fake.paragraph(nb_sentences=3), experience=randint(1,25), instrument='piano', photo='https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww')
      piano_2 = Instructor(name=fake.unique.name_female(), email=fake.email(), bio=fake.paragraph(nb_sentences=3), experience=randint(1,25), instrument='piano', photo='https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D')
      trumpet_1 = Instructor(name=fake.unique.name_male(), email=fake.email(), bio=fake.paragraph(nb_sentences=3), experience=randint(1,25), instrument='trumpet', photo='https://images.unsplash.com/photo-1521119989659-a83eee488004?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D')
      violin_1 = Instructor(name=fake.unique.name_female(), email=fake.email(), bio=fake.paragraph(nb_sentences=3), experience=randint(1,25), instrument='violin', photo='https://images.unsplash.com/photo-1554151228-14d9def656e4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBvcnRyYWl0fGVufDB8fDB8fHww')
      cello_1 = Instructor(name=fake.unique.name_male(), email=fake.email(), bio=fake.paragraph(nb_sentences=3), experience=randint(1,25), instrument='cello', photo='https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBvcnRyYWl0fGVufDB8fDB8fHww')

      db.session.add_all([drums_1, guitar_1, piano_1, piano_2, trumpet_1, violin_1, cello_1])
      db.session.commit()

      print('adding users')

      user_1 = User(username=fake.unique.name(), email=fake.email(), age=randint(4,80), primary_instrument='drums', _password_hash='apple')
      user_2 = User(username=fake.unique.name(), email=fake.email(), age=randint(4,80), primary_instrument='piano', _password_hash='apple')
      user_3 = User(username=fake.unique.name(), email=fake.email(), age=randint(4,80), primary_instrument='trumpet', _password_hash='apple')
      user_4 = User(username=fake.unique.name(), email=fake.email(), age=randint(4,80), primary_instrument='guitar', _password_hash='apple')

      db.session.add_all([user_1, user_2, user_3, user_4])
      db.session.commit()

      print('adding lessons')

      lesson_1 = Lesson(user_rating=True, date_time=datetime(2024,3,1,10,10,10), user_id=user_1.id, instructor_id=drums_1.id)
      lesson_2 = Lesson(user_rating=False, date_time=datetime(2024,4,15,20,10,0), user_id=user_2.id, instructor_id=piano_2.id)

      db.session.add_all([lesson_1, lesson_2])

      db.session.commit()
