from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Blog, User, db

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
    if request.method == 'GET':
        print(blog.to_dict())
        return blog.to_dict()

    elif request.method == 'PUT':
        """
        Edit a blog to change the banner image, blog avatar, and title
        """
        blog_title = request.form['blog_title']
        blog_avatar = request.form['blog_avatar_url']
        banner_img_url = request.form['banner_img_url']

        blog["blog_title"] = blog_title
        blog["blog_avatar"] = blog_avatar
        blog["banner_img_url"] = banner_img_url
        db.session.commit()
        return blog.to_dict()

    elif request.method == "DELETE":
        """
        Delete a blog based on id
        """

        db.session.delete(blog)
        db.session.commit()
        return {'successfully deleted'}


@blog_routes.route('/create', methods=["POST"])
@login_required
def blog_create():
    """
    Create a blog based on user id,, for the first time
    """
    userId = current_user.id
    form = BlogForm()
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
        return {'blog': blog.to_dict()}

#Sign up => #Log in => #Create Default Blog
