from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

# # OPTIONAL COMMENTS ARE OPTIONAL

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    comment = db.Column(db.String(800))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    post = db.relationship('Post', back_populates='comments')

    user = db.relationship('User', back_populates="comments")

    #Many Side, many comments can go to one post

    def to_dict(self):
        return {
            'id': self.id,
            'postId': self.post_id,
            'userId': self.user_id,
            'username': self.user.username,
            'comment': self.comment,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
