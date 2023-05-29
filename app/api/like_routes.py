from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Blog, User, db, Like

like_routes = Blueprint('likes', __name__)

@like_routes.route('/')
def likes():
    """
    Query all the likes
    """
    likes = Like.query.all()

    return {'likes': [like.to_dict() for like in likes]}
