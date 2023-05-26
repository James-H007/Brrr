from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

likes = db.Table(

    'likes',
    db.Model.metadata,

    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column('post_id', db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), primary_key=True),
    db.Column('is_liked', db.Boolean),
    db.Column('created_at', db.DateTime, default=datetime.utcnow),
    db.Column('created_at', db.DateTime, default=datetime.utcnow,  onupdate=datetime.utcnow)
)

followers = db.Table(
    'followers',
    db.Model.metadata,

    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column('blog_id', db.Integer, db.ForeignKey(add_prefix_for_prod('blogs.id'))),
    db.Column('is_followed', db.Boolean)

)

comments = db.Table(
    'comments',
    db.Model.metadata,

    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column('post_id', db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id'))),
    db.Column('comment', db.String(255))
)

class Blog(db.Model):
    __tablename__ = "blogs"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    default_vlog = db.Column(db.Boolean, nullable=False)
    blog_title = db.Column(db.String(255))
    banner_img_url = db.Column(db.String(800))
    blog_avatar_url = db.Column(db.String(800))
    blog_name = db.Column(db.String(255))
    description = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # One-to-Many (One side)
    # We're in the blog class, which will contain posts
    #Relationship with the a Post that belongs to a blog
    posts = db.relationship("Post", back_populates='blog')

    # Many side: Multiple blogs can belong to one user
    user = db.relationship("User", back_populates="blogs")

    #Many to many: Followers to blogs, blogs can be followed by many users
    blog_follows = db.relationship(
        'User',
        secondary=followers,
        back_populates="user_follows"
    )

class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    blog_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('blogs.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_title = db.Column(db.String(255))
    post_type = db.Column(db.String(255), nullable=False)
    post_description = db.Column(db.String(255))
    video_embed_code = db.Column(db.String(800))
    image_embed_code = db.Column(db.String(800))
    likes = db.Column(db.Integer)
    reblogs = db.Column(db.Integer)
    comments = db.Column(db.Integer)
    notes = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

     # One-to-Many  (Many Side)
     # Singular Host to Plural meaning a blog can have many posts
     # We're in the Post class which references the Blog which can give many posts
    blog = db.relationship("Blog", back_populates="posts")

    #One side: A post can have many images
    post_images = db.relationship("PostImage", back_populates='post')

    #One side, post hosts many likes
    #When the post is deleted, then we delete all the likes associated with it
    # likes = db.relationship("Like", back_populates='post', cascade='all, delete-orphan')

    #Many to Many: Posts can get liked by many users
    post_likes = db.relationship(
        'User',
        secondary=likes,
        back_populates="user_likes",
    )

    post_comments = db.relationship(
        "User",
        secondary=comments,
        back_populates="user_comments"
    )

class PostImage(db.Model):
    __tablename__ = "post_images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))
    image_url = db.Column(db.String(800))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    #Many images can go to one post
    post = db.relationship("Post", back_populates='post_images')
