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
    submit = SubmitField('Post')


# def validate_image(form, field):
#     if field.data:
#         filename = field.data.filename
#         if not ('.' in filename and filename.rsplit('.', 1)[1].lower() in ['png', 'jpg', 'jpeg']):
#             raise ValidationError('Invalid image extension. We accept .jpg, .jpeg and .png.')

# class PostTypeForm(FlaskForm):
#     post_type = SelectField(
#         'Choose your post type.',
#         choices=[('image', 'Image'), ('video', 'Video'), ('text', 'Text'), ('link', 'Link')],
#         validators=[DataRequired()]
#     )
#     image = FileField('Upload Image', validators=[DataRequired(), validate_image])
#     submit = SubmitField('Post')
