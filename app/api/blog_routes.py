from flask import Blueprint, jsonify, session, request, abort
from flask_login import login_required, current_user
from app.models import Blog, User, db, followers
from app.forms.blog_form import BlogForm

blog_routes = Blueprint('blogs', __name__)

@blog_routes.route('/')
def blogs():
    """
    Query all the blogs and returns them in a list of blog dictionaries
    """
    blogs = Blog.query.all()
    return {'blogs': [blog.to_dict() for blog in blogs]}

@blog_routes.route('/<int:id>', methods = ["GET", "PUT", "DELETE"])
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

    elif request.method == 'PUT':
        """
        Edit a blog to change the banner image, blog avatar, and title
        """
        blog_title = request.form['blog_title']
        blog_avatar_url = request.form['blog_avatar_url']
        banner_img_url = request.form['banner_img_url']

        blog["blog_title"] = blog_title
        blog["blog_avatar_url"] = blog_avatar_url
        blog["banner_img_url"] = banner_img_url
        db.session.commit()
        return blog.to_dict()

    elif request.method == "DELETE":
        """
        Delete a blog based on id
        """

        db.session.delete(blog)
        db.session.commit()
        return {'Successfully deleted'}



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

    # If form validation fails, you can return an error response
    errors = form.errors
    return jsonify({'errors': errors}), 400

#Sign up => #Log in => #Create Default Blog

# def blog_create():
#     """
#     Create a blog based on user id,, for the first time
#     """
#     userId = current_user.id
#     form = BlogForm()
#     if form.validate_on_submit():
#         blog = Blog (
#             blog_title = form.data["blog_title"],
#             owner_id = userId,
#             default_blog = form.data["default_blog"],
#             banner_img_url = form.data["banner_img_url"],
#             blog_avatar_url = form.data["blog_avatar_url"],
#             blog_name = form.data["blog_name"],
#             description = form.data["description"]
#         )
#         db.session.add(blog)
#         db.session.commit()
#         return {'blog': blog.to_dict()}

@blog_routes.route("/following")
@login_required
def blog_follows():
     """
    Route to get all blogs followed by the current user
    """
     userId = current_user.id

     user = User.query.get(userId)

     followed_blogs = [{"blog_name": blog.blog_name, "blog_avatar": blog.blog_avatar_url} for blog in user.user_follows]

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

    followersz = db.session.query(User).join(followers).filter(followers.c.blog_id == selected_blog.id).all()

    return_format = [
        {
            "id": follower.id,
            "first_name": follower.first_name,
            "last_name": follower.last_name,
            "email": follower.email,
            "username": follower.username
        }
        for follower in followersz
    ]

    return {'followers': return_format}, 200
