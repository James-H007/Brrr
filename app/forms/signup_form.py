from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, FileField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def validate_image(form, field):
    if field.data:
        filename = field.data.filename
        if not ('.' in filename and filename.rsplit('.', 1)[1].lower() in ['png', 'jpg', 'jpeg']):
            raise ValidationError('Invalid image extension. We accept .jpg, .jpeg and .png.')


class SignUpForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    username = StringField(
        'Username', validators=[DataRequired(), username_exists])
    email = StringField('Email', validators=[DataRequired(), user_exists])
    password = StringField('Password', validators=[DataRequired()])
    profile_pic_url = FileField('Upload Profile Picture', valdiators=[DataRequired(), validate_image])
    submit = SubmitField("Create")
