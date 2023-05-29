from flask import Blueprint, jsonify, session, request
from app.models import User, db, Post, PostImage
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

post_routes = Blueprint('post', __name__)

@post_routes.route('/')
def posts():
    """
    Query all of the posts
    """

    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('/images')
def all_post_images():
    """
    Query all of the post images
    """

    post_images = PostImage.query.all()

    return {'post_images': [post_image.to_dict() for post_image in post_images]}
