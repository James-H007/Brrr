from app.models import db, User, Blog , environment, SCHEMA
from app.models.blogs_post import followers
from sqlalchemy.sql import text

def seed_followers():
    terry = User(
        first_name='Terry',
        last_name='Ban',
        username='Terry',
        email='terry@aa.io',
        password='password',
        profile_pic_url='https://64.media.tumblr.com/d713916b3661f9cae54f9f880168a2f2/tumblr_ny5vbt2nLA1umv52oo2_500.png')

    turkey = Blog(
        owner_id=1,
        default_blog=False,
        blog_title="My Turkey Blog",
        banner_img_url="https://img.freepik.com/premium-photo/wide-banner-with-many-random-square-hexagons-charcoal-dark-black-color_105589-1820.jpg",
        blog_avatar_url="https://64.media.tumblr.com/ac46b069c7bb24e2ee5bf368a32b84fe/5c65a2189e2d73b7-9d/s540x810/384c42854b3fca915f79ffcb8dc711665b7c3519.jpg",
        blog_name="Turkey",
        description="This is blog about Turkeys",
    )

    turkey.followers.append(terry)

    db.session.add(terry)
    db.session.add(turkey)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

def undo_followers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.followers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM followers"))

    db.session.commit()
