from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-_password_hash','-lessons.user', '-lessons.instructor', '-instructors.lessons', '-instructors.users', '-lessons.user_id',)

    id=db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String, unique=True, nullable=False)
    email=db.Column(db.String, unique=True, nullable=False)
    age=db.Column(db.Integer, nullable=False)
    primary_instrument=db.Column(db.String, nullable=False)

    _password_hash = db.Column(db.String, nullable=False)

    lessons = db.relationship('Lesson', back_populates='user', cascade='all, delete-orphan')
    instructors = db.relationship('Instructor', secondary='lessons', back_populates='users')
    # instructors = association_proxy('lessons', 'instructor')

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
    
    @validates('username')
    def validate_username(self, key, username):
        if not (3 <= len(username) <= 30):
            raise ValueError('username must be between 3 and 15 characters')
        return username
    
    @validates('email')
    def validate_email(self, key, address):
        if '@' not in address:
            raise ValueError('invalid email input/format')
        return address
    
    @validates('age')
    def validate_age(self, key, age):
        if not isinstance(age, int) or age <= 3:
            raise ValueError('age must be an integer greater than 3')
        return age
    
    @validates('primary_instrument')
    def validate_primary_instrument(self, key, primary_instrument):
        VALID_INSTUMENTS = ['piano', 'drums', 'bass', 'guitar', 'trumpet','trombone', 'tuba', 'french horn', 'cello', 'violin', 'viola', 'voice']

        if not any(instrument in primary_instrument for instrument in VALID_INSTUMENTS):
            raise ValueError('need to select a instrument that we teach')
        return primary_instrument

    
    def __repr__(self):
        return f'<User {self.id}: {self.username}'

class Instructor(db.Model, SerializerMixin):
    __tablename__ = 'instructors'

    serialize_rules = ('-lessons.user.lessons', '-lessons.user.instructors', '-lessons.instructor', '-lessons.instructor_id', '-users', '-lessons.user_id',)

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    email=db.Column(db.String, unique=True, nullable=False)
    bio=db.Column(db.String, nullable=False)
    experience=db.Column(db.Integer, nullable=False, default=0)
    instrument=db.Column(db.String, nullable=False)
    photo=db.Column(db.String)

    lessons = db.relationship('Lesson', back_populates='instructor', cascade='all, delete-orphan')
    users = db.relationship('User', secondary='lessons', back_populates='instructors')

    @validates('email')
    def validate_email(self, key, address):
        if '@' not in address:
            raise ValueError('invalid email input/format')
        return address
    
    @validates('name')
    def validate_name(self, key, name):
        if not (3 <= len(name) <= 30):
            raise ValueError('name must be between 3 and 15 characters')
        return name
    
    @validates('bio')
    def validate_bio(self, key, bio):
        if not (10 <= len(bio) <=250):
            raise ValueError('bios must be between 10 and 250 characters')
        return bio
    
    @validates('experience')
    def validates_experience(self, key, experience):
        if experience <= 1:
            raise ValueError('instructors must have at least one year of teaching experience')
        return experience
    
    @validates('instrument')
    def validates_instrument(self, key, instructor_instrument):
        VALID_INSTUMENTS = ['piano', 'drums', 'bass', 'guitar', 'trumpet','trombone', 'tuba', 'french horn', 'cello', 'violin', 'viola', 'voice']

        if not any(instrument in instructor_instrument for instrument in VALID_INSTUMENTS):
            raise ValueError('need to select a instrument that we teach')
        return instructor_instrument

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

