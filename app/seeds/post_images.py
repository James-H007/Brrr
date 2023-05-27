from app.models import db, PostImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_post_images():
    demo = PostImage(
        post_id=1,
        image_url = "https://www.state.gov/wp-content/uploads/2020/07/72-729738_youtube-red-circle-circle-youtube-logo-png-clipart.jpg"
    )
    marnie = PostImage(
        post_id=2,
        image_url= "https://cdn.britannica.com/84/73184-050-05ED59CB/Sunflower-field-Fargo-North-Dakota.jpg"
    )
    bobbie = PostImage(
        post_id=3,
        image_url="https://media.sproutsocial.com/uploads/1c-LinkedIn-Banner-Personal-design-1.png"
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

def undo_post_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.post_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM post_images"))

    db.session.commit()
