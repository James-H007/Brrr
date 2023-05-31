from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Blog, User, db, Like, Post

like_routes = Blueprint('likes', __name__)

@like_routes.route('/')
def likes():
    """
    Query all the likes
    """
    likes = Like.query.all()

    return {'likes': [like.to_dict() for like in likes]}


@like_routes.route('/mine', methods=['GET'])
@login_required
def get_user_liked_posts():
    """"
    Query for all the liked posts by the current user
    """
    user_likes = (
        db.session.query(Post)
        .join(Like, Like.post_id == Post.id)
        .filter(Like.user_id == current_user.id)
        .all()
    )

    return ([post.to_dict() for post in user_likes])
