from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

#LIKES SHOULD NOT NEED TO BE A JOIN TABLE, CODE BLOCK BELOW DEPRECATED
# likes = db.Table(

#     'likes',
#     db.Model.metadata,

#     db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
#     db.Column('post_id', db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), primary_key=True),
#     db.Column('is_liked', db.Boolean),
#     db.Column('created_at', db.DateTime, default=datetime.utcnow),
#     db.Column('created_at', db.DateTime, default=datetime.utcnow,  onupdate=datetime.utcnow)
# )

followers = db.Table(
    'followers',
    db.Model.metadata,

    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column('blog_id', db.Integer, db.ForeignKey(add_prefix_for_prod('blogs.id'))),
    db.Column('is_followed', db.Boolean)

)

# Comments does not need to be a join table (Code below is deprecated)
# comments = db.Table(
#     'comments',
#     db.Model.metadata,

#     db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
#     db.Column('post_id', db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id'))),
#     db.Column('comment', db.String(255))
# )

class Blog(db.Model):
    __tablename__ = "blogs"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    default_blog = db.Column(db.Boolean, default=False, nullable=False)
    blog_title = db.Column(db.String(255))
    banner_img_url = db.Column(db.String(800))
    blog_avatar_url = db.Column(db.String(800))
    blog_name = db.Column(db.String(255), unique=True)
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

    # @property

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'defaultBlog': self.default_blog,
            'blogTitle':self.blog_title,
            'bannerImgUrl': self.banner_img_url,
            'blogAvatarUrl': self.blog_avatar_url,
            'blogName': self.blog_name,
            'followerCount': len(self.blog_follows),
            'description':self.description,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at,
            'posts':[post.to_dict() for post in self.posts]

        }

class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    blog_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('blogs.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_title = db.Column(db.String(255))
    post_type = db.Column(db.String(255), nullable=False)
    post_description = db.Column(db.String(1200))
    video_embed_code = db.Column(db.String(800))
    image_embed_code = db.Column(db.String(800))
    likes_count = db.Column(db.Integer)
    reblogs = db.Column(db.Integer)
    comments_count = db.Column(db.Integer)
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
    likes = db.relationship("Like", back_populates='post', cascade='all, delete-orphan')

    #Many to Many: Posts can get liked by many users (DEPRECATED)
    # post_likes = db.relationship(
    #     'User',
    #     secondary=likes,
    #     back_populates="user_likes",
    # )

    #One side, post hosts many comments
    comments = db.relationship("Comment", back_populates='post', cascade='all, delete-orphan')

    # Code block below (DEPRECATED)
    # post_comments = db.relationship(
    #     "User",
    #     secondary=comments,
    #     back_populates="user_comments"
    # )

    def to_dict(self):
        return {
            'id':self.id,
            'blogId':self.blog_id,
            'userId':self.user_id,
            'postTitle':self.post_title,
            'postType':self.post_type,
            'postDescription':self.post_description,
            'videoEmbedCode':self.video_embed_code,
            'imageEmbedCode':self.image_embed_code,
            'likes':len(self.likes),
            'reblogs':self.reblogs,
            'comments':[comment.to_dict() for comment in self.comments],
            'notes':self.notes,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at,
            'postImages': [image.to_dict() for image in self.post_images]
        }

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

    def to_dict(self):
        return {
            'id': self.id,
            'postId': self.post_id,
            'imageUrl': self.image_url,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
