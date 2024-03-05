import os

from config import app, db

from random import randint, choice as rc

from faker import Faker

from app import app
from models import db, Instructor

if __name__ == "__main__":
  with app.app_context():
      print("Starting seed...")
      # Seed code goes here!
      Instructor.query.delete()

      fake = Faker()

      drums_1 = Instructor(name=fake.unique.name(), email=fake.email(), bio=fake.paragraph(nb_sentences=3), experience=randint(1,25), instrument='drums', photo=os.path.join('static', 'images', 'drums_tiger.png'))
      guitar_1 = Instructor(name=fake.unique.name(), email=fake.email(), bio=fake.paragraph(nb_sentences=3), experience=randint(1,25), instrument='guitar', photo=os.path.join('static', 'images', 'guitar_penguin.png'))
      piano_1 = Instructor(name=fake.unique.name(), email=fake.email(), bio=fake.paragraph(nb_sentences=3), experience=randint(1,25), instrument='piano', photo=os.path.join('static', 'images', 'piano_cat.png'))
      piano_2 = Instructor(name=fake.unique.name(), email=fake.email(), bio=fake.paragraph(nb_sentences=3), experience=randint(1,25), instrument='piano', photo=os.path.join('static', 'images', 'piano_chipmunk.png'))
      trumpet_1 = Instructor(name=fake.unique.name_male(), email=fake.email(), bio=fake.paragraph(nb_sentences=3), experience=randint(1,25), instrument='trumpet', photo=os.path.join('static', 'images', 'trumpet_person.png'))
      violin_1 = Instructor(name=fake.unique.name_female(), email=fake.email(), bio=fake.paragraph(nb_sentences=3), experience=randint(1,25), instrument='violin', photo=os.path.join('static', 'images', 'violin_person.png'))
      cello_1 = Instructor(name=fake.unique.name_male(), email=fake.email(), bio=fake.paragraph(nb_sentences=3), experience=randint(1,25), instrument='cello', photo=os.path.join('static', 'images', 'cello_person.png'))

      db.session.add_all([drums_1, guitar_1, piano_1, piano_2, trumpet_1, violin_1, cello_1])

      db.session.commit()
