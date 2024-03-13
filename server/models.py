from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-_password_hash','-lessons.user','-lessons.user_id', '-instructors.users',)

    id=db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String, unique=True, nullable=False)
    email=db.Column(db.String, unique=True, nullable=False)
    age=db.Column(db.Integer, db.CheckConstraint('age < 3', name='age_check'), nullable=False)
    primary_instrument=db.Column(db.String, nullable=False)

    _password_hash = db.Column(db.String, nullable=False)

    lessons = db.relationship('Lesson', back_populates='user', cascade='all, delete-orphan')

    # instructors = association_proxy('lessons', 'instructor')

    # new
    instructors = db.relationship('Instructor', secondary='lessons', back_populates='users')

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
    
    @validates('email')
    def validate_email(self, key, address):
        if '@' not in address:
            raise ValueError('invalid email input/format')
        return address
    
    @validates('username')
    def validate_username(self, key, name):
        if not (3 <= len(name) <= 15):
            raise ValueError('username must be between 3 and 15 characters')
        return name
    
    def __repr__(self):
        return f'<User {self.id}: {self.username}'

class Instructor(db.Model, SerializerMixin):
    __tablename__ = 'instructors'

    serialize_rules = ('-lessons.instructor', '-users.instructors',)

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, unique=True, nullable=False)
    email=db.Column(db.String, unique=True, nullable=False)
    bio=db.Column(db.String, nullable=False)
    experience=db.Column(db.Integer, nullable=False, default=0)
    instrument=db.Column(db.String, nullable=False)
    photo=db.Column(db.String)

    lessons = db.relationship('Lesson', back_populates='instructor', cascade='all, delete-orphan')

    # new
    users = db.relationship('User', secondary='lessons', back_populates='instructors')

    def __repr__(self):
        return f'<Instructor {self.id}: {self.name}'

class Lesson(db.Model, SerializerMixin):
    __tablename__ = 'lessons'

    serialize_rules = ('-user.lessons', '-instructor.lessons',)

    id=db.Column(db.Integer, primary_key=True)
    user_rating=db.Column(db.Boolean)
    date_time=db.Column(db.DateTime)

    user_id=db.Column(db.Integer, db.ForeignKey('users.id'))
    instructor_id=db.Column(db.Integer, db.ForeignKey('instructors.id'))

    user = db.relationship('User', back_populates='lessons')
    instructor = db.relationship('Instructor', back_populates='lessons')


    def __repr__(self):
        user=self.user.username if self.user else None
        instructor=self.instructor.name if self.instructor else None
        return f'<Lesson {user}: {instructor}'

