from flask_wtf import FlaskForm
from wtforms import SelectField, SubmitField, StringField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Post


def validate_image(form, field):
    if field.data:
        if not (field.data.endswith('.png') or field.data.endswith('.jpg') or field.data.endswith('.jpeg')):
            raise ValidationError('Invalid image extension. We accept .jpg, .jpeg and .png.')

class PostTypeForm(FlaskForm):
    post_title = StringField('Add a title', validators=[DataRequired(), Length(min=1, max=255,  message='Post title must be between 1 and 255 characters')])
    post_type = SelectField(
        'Choose your post type.',
        choices=[('image', 'Image'), ('video', 'Video'), ('text', 'Text'), ('link', 'Link')],
        validators=[DataRequired()]
    )
    post_description = StringField('Add a description', validators=[Length(min=1, max=1200)] )
    image_embed_code = StringField('Image Embed Code', validate_image)
    video_embed_code = StringField('Video Embed Code')
    submit = SubmitField('Post')
