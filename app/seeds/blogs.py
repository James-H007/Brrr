from app.models import db, Blog, environment, SCHEMA
from sqlalchemy.sql import text

def seed_blogs():
    demo = Blog(
        owner_id=1,
        default_blog=True,
        blog_title="My Demo Blog",
        banner_img_url="https://img.freepik.com/premium-photo/wide-banner-with-many-random-square-hexagons-charcoal-dark-black-color_105589-1820.jpg",
        blog_avatar_url="https://64.media.tumblr.com/ac46b069c7bb24e2ee5bf368a32b84fe/5c65a2189e2d73b7-9d/s540x810/384c42854b3fca915f79ffcb8dc711665b7c3519.jpg",
        blog_name="Demo",
        description="This is Demo User's blog",
    )
    marnie = Blog(
        owner_id=2,
        default_blog=True,
        blog_title="Marnie's Blog",
        banner_img_url="https://marketplace.canva.com/EAEiQaq0NWg/1/0/1600w/canva-orange-ebb-and-flow-abstract-linkedin-banner-5YDmHwJk-Yc.jpg",
        blog_avatar_url="https://64.media.tumblr.com/ac46b069c7bb24e2ee5bf368a32b84fe/5c65a2189e2d73b7-9d/s540x810/384c42854b3fca915f79ffcb8dc711665b7c3519.jpg",
        blog_name="Marnie",
        description="This is Marnie's blog",
    )
    bobbie = Blog(
        owner_id=3,
        default_blog=True,
        blog_title="Bobbie's Blog",
        banner_img_url="https://marketplace.canva.com/EAENvp21inc/1/0/1600w/canva-simple-work-linkedin-banner-qt_TMRJF4m0.jpg",
        blog_avatar_url="https://64.media.tumblr.com/ac46b069c7bb24e2ee5bf368a32b84fe/5c65a2189e2d73b7-9d/s540x810/384c42854b3fca915f79ffcb8dc711665b7c3519.jpg",
        blog_name="Bobbie",
        description="This is Bobbie's blog",
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

def undo_blogs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.blogs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM blogs"))

    db.session.commit()
