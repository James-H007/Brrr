from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .blogs_post import Follower, Blog, Post, PostImage



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_pic_url = db.Column(db.String(800), nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    #A user can like many posts
    # CODE BLOCK BELOW DEPRECATED
    # user_likes = db.relationship(
    #     "Post",
    #     secondary=likes,
    #     back_populates="post_likes",
    #     cascade='all, delete-orphan'
    # )

    # A user can follow many blogs

    # user_follows = db.relationship(
    #     "Blog",
    #     secondary=followers,
    #     back_populates="blog_follows",
    # )

    # A user can leave many comments
    # CODE BLOCK BELOW
    # user_comments = db.relationship(
    #     "Post",
    #     secondary=comments,
    #     back_populates="post_comments",

    # )
    blog_follows = db.relationship("Follower", back_populates='follower')
    #One side: A user can own many blogs
    blogs = db.relationship("Blog", back_populates='user', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName':self.last_name,
            'username': self.username,
            'email': self.email,
            'profilePicUrl': self.profile_pic_url,
            'blogs': [blog.to_dict() for blog in self.blogs],
            'createdAt':self.created_at,
            'updatedAt':self.updated_at
        }
    def to_dict_no_blogs(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName':self.last_name,
            'username': self.username,
            'email': self.email,
            'profilePicUrl': self.profile_pic_url,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at
        }
