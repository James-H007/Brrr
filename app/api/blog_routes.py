from flask import Blueprint, jsonify, session, request, abort
from flask_login import login_required, current_user
from app.models import Blog, User, db, followers
from app.forms.blog_form import BlogForm
from sqlalchemy import and_

blog_routes = Blueprint('blogs', __name__)

@blog_routes.route('/')
def blogs():
    """
    Query all the blogs and returns them in a list of blog dictionaries
    """
    blogs = Blog.query.all()
    return {'blogs': [blog.to_dict() for blog in blogs]}

@blog_routes.route('/<int:id>', methods = ["GET", "DELETE"])  #🟨🟨🟨🟨🟨 Error's out with PUT
@login_required
def blog(id):
    blog = Blog.query.get(id)
    """
    Query for a blog by id and returns that blog in a dictionary
    """
    if blog is None:
        return jsonify({"error": "Blog not found"}), 404

    if request.method == 'GET':
        print(blog.to_dict())
        return blog.to_dict()

    elif request.method == "DELETE":
        """
        Delete a blog based on id
        """

        db.session.delete(blog)
        db.session.commit()
        return {'Successfully deleted'}


@blog_routes.route('/<int:id>/edit', methods = ["PUT"])  #🟨🟨🟨🟨🟨 Error's out with PUT
@login_required
def blog_edit(id):

    userId = current_user.id

    blog = Blog.query.get(id)

    if not blog:
        return {"Error": "Blog not found."}, 404

    if blog.owner_id != userId:
        return {"Error": "You don't have permission to edit this blog"}, 403

    data = request.get_json()

    if "blog_title" in data:
        blog.blog_title = data["blog_title"]
    if "banner_img_url" in data:
        blog.banner_img_url = data["banner_img_url"]
    if "blog_avatar_url" in data:
        blog.blog_avatar_url = data["blog_avatar_url"]
    if "description" in data:
        blog.description = data["description"]
    if "default_blog" in data:
        blog.default_blog = data["default_blog"]

    db.session.commit()
    return {"blog": blog.to_dict()}, 200



@blog_routes.route('/create', methods=["POST"])
@login_required
def blog_create():
    """
    Create a blog based on user id, for the first time
    """
    print(current_user, "---------------------------------------------")
    userId = current_user.id
    form = BlogForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        blog = Blog (
            blog_title = form.data["blog_title"],
            owner_id = userId,
            default_blog = form.data["default_blog"],
            banner_img_url = form.data["banner_img_url"],
            blog_avatar_url = form.data["blog_avatar_url"],
            blog_name = form.data["blog_name"],
            description = form.data["description"]
        )
        db.session.add(blog)
        db.session.commit()
        return jsonify({'blog': blog.to_dict()})

    errors = form.errors
    return jsonify({'errors': errors}), 400



@blog_routes.route("/following")
@login_required
def blog_follows():
     """
    Route to get all blogs followed by the current user
    """
     userId = current_user.id

     user = User.query.get(userId)

     followed_blogs = [{"id":blog.id, "blog_name": blog.blog_name, "blog_avatar": blog.blog_avatar_url} for blog in user.user_follows]

     return {'followed_blogs': followed_blogs}, 200


@blog_routes.route("/<int:id>/followers")
@login_required
def blog_followers(id):
    """
    Route to get all the blog followers
    """
    selected_blog = Blog.query.get(id)

    if not selected_blog:
        return {'message': 'Blog not found'}, 404

    followers = selected_blog.blog_follows

    return_format = [
        {
            "id": follower.id,
            "first_name": follower.first_name,
            "last_name": follower.last_name,
            "username": follower.username
        }
        for follower in followers
    ]

    return {'followers': return_format}, 200

@blog_routes.route('/<int:id>/follow', methods=["POST"])
@login_required
def follow_blog(id):
    blog = Blog.query.get(id)

    if blog is None:
        return jsonify({"error": "Blog not found"}), 404

    # followers.insert().values(
    #     user_id=current_user.id,
    #     blog_id=blog.id,
    #     is_followed=True
    # )

    db.session.connection().execute(followers.insert().values(
        user_id=current_user.id,
        blog_id=blog.id,
        is_followed=True
    ))

    db.session.commit()

    return {'message': 'Followed the blog successfully'}


@blog_routes.route('/<int:id>/unfollow', methods=["DELETE"])
@login_required
def unfollow_blog(id):
    blog = Blog.query.get(id)

    if blog is None:
        return jsonify({"error": "Blog not found"}), 404

    followers.delete().where(
        and_(
            followers.c.user_id == current_user.id,
            followers.c.blog_id == blog.id
        )
    )

    db.session.connection().execute(followers.delete())

    db.session.commit()

    return {'message': 'Unfollowed the blog successfully'}
