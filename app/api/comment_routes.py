from flask import Blueprint, jsonify, session, request
from app.models import User, db, Comment
from app.forms.comment_form import CommentTypeForm
from flask_login import current_user, login_user, logout_user, login_required

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/', methods = ["GET"])
def comments():
    """
    Query all comments
    """

    comments = Comment.query.all()

    return {'comments': [comment.to_dict() for comment in comments]}, 200

@comment_routes.route('/post-comments/<int:postId>', methods = ["GET"])
def post_comment(postId):
    """
    Route to get all the comments of a post
    """

    userId = current_user.id
    post_comments = Comment.query.filter_by(post_id=postId).all()

    return {'comments': [comment.to_dict() for comment in post_comments]}, 200

@comment_routes.route('/<int:postId>/create-comment', methods=["POST"])
def create_comment(postId):
    """
    Route to create a comment
    """

    userId = current_user.id


    form = CommentTypeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment (
            comment = form.data["comment"],
            user_id = userId,
            post_id = postId
        )
        db.session.add(comment)
        db.session.commit()
        return {'comment': comment.to_dict()}, 200

    errors = form.errors
    print(errors)
    return jsonify({'errors': errors}), 400

@comment_routes.route('/<int:commentId>/delete-comment', methods=['DELETE'])
@login_required
def delete_comment(commentId):
    """
    Route to delete a post based on "post_id"
    """
    userId = current_user.id

    comment = Comment.query.get(commentId)

    if not comment:
        return {"error": "Comment not found."}, 404

    if comment.user_id != userId:
        return {"error": "You do not have permission to delete this comment"}, 403

    db.session.delete(comment)
    db.session.commit()

    return {'message': 'Successfully deleted comment'}
