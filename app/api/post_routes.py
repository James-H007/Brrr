from flask import Blueprint, jsonify, session, request
from app.models import User, db, Post, PostImage
from app.forms.login_form import LoginForm
from app.forms.signup_form import SignUpForm
from app.forms.post_forms import PostTypeForm
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.utils import secure_filename
from ..aws_s3_bucket import s3, bucket
import os

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def posts():
    """
    Query all of the posts
    """

    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}, 200


@post_routes.route('/my-posts', methods=["GET"])
@login_required
def user_posts():
    """
    Route to get all posts by the current user
    """
    userId = current_user.id
    user_posts = Post.query.filter_by(user_id=userId).all()

    return {'posts': [post.to_dict() for post in user_posts]}, 200



@post_routes.route('/images')
def all_post_images():
    """
    Query all of the post images
    """

    post_images = PostImage.query.all()

    return {'post_images': [post_image.to_dict() for post_image in post_images]}, 200



@post_routes.route('/create/<int:blog_id>', methods=["GET","POST"])
@login_required
def create_post(blog_id):
    """
    Route to post to a blog
    """
    userId = current_user.id
    description = request.form.get('description', ' ')

    form = PostTypeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if 'file' in request.files:
        file = request.files['file']
        if file.filename == '':
            return {"error": "No file selected"}, 400

        filename = secure_filename(file.filename)
        file.save(filename)

        s3.upload_file(
            Bucket='flaskbrrr',
            Filename=filename,
            Key=filename
        )

        url = f"https://{bucket}.s3.us-east-2.amazonaws.com/{filename}"

        post_type = "video" if filename.lower().endswith(('.mp4', '.mov', '.avi', '.mkv', '.flv')) else "image"

        if post_type == "video":
            post = Post(
                blog_id=blog_id,
                user_id=userId,
                post_type=post_type,
                post_title=f"{post_type.capitalize()} post",
                post_description=description,
                video_embed_code=url,
            )
        else:
            post = Post(
                blog_id=blog_id,
                user_id=userId,
                post_type=post_type,
                post_title=f"{post_type.capitalize()} post",
                post_description=description,
                image_embed_code=url,
            )

        db.session.add(post)
        db.session.commit()

        try:
            os.remove(filename)
        except Exception as e:
            print(f"Error occurred while deleting file: {e}")

        return {'post': post.to_dict()}, 201

    elif form.validate_on_submit():
        post = Post (
            blog_id = blog_id,
            user_id = userId,
            post_title = form.data["post_title"],
            post_type = form.data["post_type"],
            post_description = form.data["post_description"],
            video_embed_code = form.data["video_embed_code"],
        )

        db.session.add(post)
        db.session.commit()

        return {'post': post.to_dict()}, 201
    else:
        print(form.errors)
        return {"error": form.errors}, 404


@post_routes.route('/<int:post_id>/edit', methods=["PUT"])
@login_required
def edit_post(post_id):
    """
    Route to edit a post
    """
    userId = current_user.id

    post = Post.query.get(post_id) # <<-- Grabbing the specific post

    if not post:
        return {"error": "Post not found."}, 404

    if post.user_id != userId:
        return {"error": "You don't have permission to edit this post"}, 403

    data = request.get_json()

    if "post_title" in data:
        post.post_title = data["post_title"]
    if "post_type" in data:
        post.post_type = data["post_type"]
    if "post_description" in data:
        post.post_description = data["post_description"]
    if "video_embed_code" in data:
        post.video_embed_code = data["video_embed_code"]
    if "image_embed_code" in data:
        post.image_embed_code = data["image_embed_code"]

    db.session.commit()
    return {"post": post.to_dict()}, 200



@post_routes.route('/<int:post_id>', methods=["DELETE"])
@login_required
def delete_post(post_id):
    """
    Route to delete a post based on "post_id"
    """
    userId = current_user.id

    post = Post.query.get(post_id)

    if not post:
        return {"error": "Post not found."}, 404

    if post.user_id != userId:
        return {"error": "You do not have permission to delete this post"}, 403

    db.session.delete(post)
    db.session.commit()

    return {"message": "Deleted Successfully"}, 200
