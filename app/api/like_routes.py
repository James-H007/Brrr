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


@like_routes.route('/my-likes', methods=['GET'])
@login_required
def get_user_liked_posts():
    """"
    Query for all the liked posts by the current user
    """
    userId = current_user.id
    likes = Like.query.filter(Like.user_id == userId,
                              Like.is_liked == True).all()

    return {"likedPosts": [like.to_dict() for like in likes]}

@like_routes.route('/<int:post_id>/like', methods=["POST"])
@login_required
def like_post(post_id):

    """
    Route to like a post
    """
    existing_like = Like.query.filter_by(user_id=current_user.id, post_id=post_id).first()
    post = Post.query.get(post_id)

    if existing_like:
        return {"error": "Post already liked"}, 400
    else:
        new_like = Like(user_id=current_user.id, post_id=post_id, is_liked=True)
        db.session.add(new_like)
        post.likes_count += 1

    db.session.commit()

    return {"post": post.to_dict()}, 200




@like_routes.route('/<int:post_id>/unlike', methods=["POST"])
@login_required
def unlike_post(post_id):
    """
    Route to unlike a post
    """
    like = Like.query.filter_by(user_id=current_user.id, post_id=post_id).first()
    post = Post.query.get(post_id)

    if like:
        db.session.delete(like)
        post.likes_count -= 1
    else:
        return {"error": "Post not liked yet"}, 400

    db.session.commit()

    return {"post": post.to_dict()}, 200
