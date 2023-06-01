from flask import Blueprint, jsonify, session, request
from app.models import User, db, Post, PostImage
from app.forms.login_form import LoginForm
from app.forms.signup_form import SignUpForm
from app.forms.post_forms import PostTypeForm
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.utils import secure_filename
from ..aws_s3_bucket import s3, bucket

post_routes = Blueprint('post', __name__)

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

    form = PostTypeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post (
            blog_id = blog_id,
            user_id = userId,
            post_title = form.data["post_title"],
            post_type = form.data["post_type"],
            post_description = form.data["post_description"],
            video_embed_code = form.data["video_embed_code"],
            image_embed_code = form.data["image_embed_code"],
        )

        db.session.add(post)
        db.session.commit()

        # We have to do this after ⬇ because we need the post.id

        if 'file' in request.files:
            file = request.files['file']
            # if user does not select file, browser submits an empty part without a filename
            if file.filename != '':
                filename = secure_filename(file.filename)
                file.save(filename)

                # Upload the user's chosen file to AWS S3
                s3.upload_file(
                    Bucket='flaskbrrr',
                    Filename=filename,
                    Key=filename
                )

                # Get the URL of the uploaded file
                url = f"https://{bucket}.s3.us-east-2.amazonaws.com/{filename}"

                post_image = PostImage(
                    post_id=post.id,
                    image_url=url
                )
                db.session.add(post_image)
                db.session.commit()

        return {'post': post.to_dict()}, 201

    return {"error": form.errors}, 404 # <<-- change this after testing


@post_routes.route('/<int:post_id>', methods=["PUT"])
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


    form = PostTypeForm()
    if form.validate_on_submit():
        post.post_title = form.data["post_title"]
        post.post_type = form.data["post_type"]
        post.post_description = form.data["post_description"]
        post.video_embed_code = form.data["video_embed_code"]
        post.image_embed_code = form.data["image_embed_code"]

        db.session.commit()
        return {"post": post.to_dict()}, 200

    return {"error": "Invaid form data"}, 400


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
