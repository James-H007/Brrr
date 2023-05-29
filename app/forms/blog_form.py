from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length
from app.models import Blog

class BlogForm(FlaskForm):

    blog_title = StringField('Title', validators=[DataRequired(), Length(min=1, max=50, message='Blog title must be between 1 and 50 characters')])
    blog_name = StringField('Name', validators=[DataRequired(), Length(min=1, max=50, message='Blog Name must be between 1 and 50 characters')])
    submit = SubmitField('Create')
