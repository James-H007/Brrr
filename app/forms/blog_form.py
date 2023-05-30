from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Blog



def validate_image(form, field):
    if field.data:
        if not (field.data.endswith('.png') or field.data.endswith('.jpg') or field.data.endswith('.jpeg')):
            raise ValidationError('Invalid image extension. We accept .jpg, .jpeg and .png.')

class BlogForm(FlaskForm):

    blog_title = StringField('Title', validators=[DataRequired(), Length(min=1, max=50, message='Blog title must be between 1 and 50 characters')])
    banner_img_url = StringField('Banner Image', validate_image)
    blog_avatar_url = StringField('Blog Avatar', validate_image)
    blog_name = StringField('Name', validators=[DataRequired(), Length(min=1, max=50, message='Blog Name must be between 1 and 50 characters')])
    description = StringField("Description")
    submit = SubmitField('Create')
