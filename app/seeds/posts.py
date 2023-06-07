from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
    demo = Post(
        blog_id=1,
        user_id=1,
        post_title="Demo User's First Post",
        post_type = "text",
        post_description="Hello, Demo User here. It's my first post",
        video_embed_code="fake.url",
        image_embed_code="fake.url",
        likes_count=1,
        reblogs=0,
        comments_count=0,
        notes=0,
    )
    marnie = Post(
        blog_id=2,
        user_id=2,
        post_title="Marnie's First Post",
        post_type = "text",
        post_description="Hello, Marnie here. It's my first post",
        video_embed_code="fake.url",
        image_embed_code="fake.url",
        likes_count=1,
        reblogs=0,
        comments_count=0,
        notes=0,
    )
    bobbie = Post(
        blog_id=3,
        user_id=3,
        post_title="Bobbie's First Post",
        post_type = "text",
        post_description="Hello, Bobbie here. It's my first post",
        video_embed_code="fake.url",
        image_embed_code="fake.url",
        likes_count=0,
        reblogs=0,
        comments_count=0,
        notes=0,
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
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
