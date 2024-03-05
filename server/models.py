from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db


class Instructor(db.Model, SerializerMixin):
    __tablename__ = 'instructors'

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, unique=True, nullable=False)
    email=db.Column(db.String, unique=True, nullable=False)
    bio=db.Column(db.String, nullable=False)
    experience=db.Column(db.Integer, nullable=False, default=0)
    instrument=db.Column(db.String, nullable=False)
    photo=db.Column(db.String)