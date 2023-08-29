from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Comment

class CommentTypeForm(FlaskForm):
    comment = StringField('Comment', validators=[Length(min=1, max=800, message='Comment must be between 1 and 800 characters')])
    submit = SubmitField('Post')
