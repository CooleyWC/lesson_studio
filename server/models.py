from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt


# class Student(db.Model, SerializerMixin):
#     __tablename__ = 'students'

#     id=db.Column(db.Integer, primary_key=True)
#     name=db.Column(db.String, unique=True, nullable=False)
#     email=db.Column(db.String, unique=True, nullable=False)
#     age=db.Column(db.Integer, db.CheckConstraint('age < 3'), nullable=False)
#     primary_instrument=db.Columns(db.String, nullable=False)

#     _password_hash = 


class Instructor(db.Model, SerializerMixin):
    __tablename__ = 'instructors'

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, unique=True, nullable=False)
    email=db.Column(db.String, unique=True, nullable=False)
    bio=db.Column(db.String, nullable=False)
    experience=db.Column(db.Integer, nullable=False, default=0)
    instrument=db.Column(db.String, nullable=False)
    photo=db.Column(db.String)

# class Lesson(db.Model, SerializerMixin):
#     __tablename__ = 'lessons'

#     id=db.Column(db.Integer, primary_key=True)
#     date=db.Column()