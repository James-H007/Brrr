from flask_wtf import FlaskForm
from wtforms import SelectField, SubmitField
from wtforms.validators import DataRequired
from app.models import Post


class PostTypeForm(FlaskForm):
    post_type = SelectField(
        'Choose your post type.',
        choices=[('image', 'Image'), ('video', 'Video'), ('text', 'Text'), ('link', 'Link')],
        validators=[DataRequired()]
    )
    submit = SubmitField('Submit')
