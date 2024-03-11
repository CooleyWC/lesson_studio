from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'user'

    id=db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String, unique=True, nullable=False)
    email=db.Column(db.String, unique=True, nullable=False)
    age=db.Column(db.Integer, db.CheckConstraint('age < 3 name=age_check'), nullable=False)
    age=db.Column(db.Integer, nullable=False)
    primary_instrument=db.Column(db.String, nullable=False)

    _password_hash = db.Column(db.String, nullable=False)

    # __table_args__ = (
    #     db.CheckConstraint('(age <3) name=age_check'),
    # )

    @hybrid_property
    def password_hash(self):
        raise AttributeError('password is not viewable')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash=bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )


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