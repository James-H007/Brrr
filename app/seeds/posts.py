from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
    demo = Post(
        blog_id=1,
        user_id=1,
        post_title="Demo User's First Post",
        post_type = "text",
        post_description="Art is the bridge between what we see and what we feel.",
        video_embed_code="fake.url",
        image_embed_code="fake.url",
        likes_count=1,
        reblogs=0,
        comments_count=0,
        notes=1,
    )
    demo2 = Post(
        blog_id=1,
        user_id=1,
        post_title="Demo User's First Post",
        post_type = "image",
        post_description="The Mona Lisa",
        video_embed_code="fake.url",
        image_embed_code="https://cdn.shopify.com/s/files/1/1414/2472/files/1-_604px-Mona_Lisa__by_Leonardo_da_Vinci__from_C2RMF_retouched.jpg",
        likes_count=2000,
        reblogs=0,
        comments_count=0,
        notes=2000,
    )
    demo3 = Post(
        blog_id=1,
        user_id=1,
        post_title="Demo User's First Post",
        post_type = "image",
        post_description="The Last Supper",
        video_embed_code="fake.url",
        image_embed_code="https://cdn.shopify.com/s/files/1/1414/2472/files/4-_640px-Ultima_Cena_-_Da_Vinci_5-compressor.jpg",
        likes_count=2000,
        reblogs=0,
        comments_count=0,
        notes=2000,
    )
    marnie = Post(
        blog_id=2,
        user_id=2,
        post_title="Pride and Prejudice",
        post_type = "text",
        post_description="It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
        video_embed_code="fake.url",
        image_embed_code="fake.url",
        likes_count=1,
        reblogs=0,
        comments_count=0,
        notes=1,
    )
    marnie2 = Post(
        blog_id=2,
        user_id=2,
        post_title="Moby-Dick",
        post_type = "text",
        post_description="Call me Ishmael. Some years ago - never mind how long precisely - having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
        video_embed_code="fake.url",
        image_embed_code="fake.url",
        likes_count=101,
        reblogs=0,
        comments_count=0,
        notes=101,
    )
    marnie3 = Post(
        blog_id=2,
        user_id=2,
        post_title="1984",
        post_type = "text",
        post_description="War is peace. Freedom is slavery. Ignorance is strength.",
        video_embed_code="fake.url",
        image_embed_code="fake.url",
        likes_count=101,
        reblogs=0,
        comments_count=0,
        notes=101,
    )
    bobbie = Post(
        blog_id=3,
        user_id=3,
        post_title="Bobbie's First Post",
        post_type = "image",
        post_description="I'm not going to say any names 😶",
        video_embed_code="fake.url",
        image_embed_code="https://static.tvtropes.org/pmwiki/pub/images/i_wonder_who_thats_for.jpg",
        likes_count=0,
        reblogs=0,
        comments_count=0,
        notes=0,
    )
    bobbie2 = Post(
        blog_id=3,
        user_id=3,
        post_title="Bobbie's First Post",
        post_type = "image",
        post_description="When I say I'm bored and then my parents say I should do my homework---",
        video_embed_code="fake.url",
        image_embed_code="https://media3.giphy.com/media/4pMX5rJ4PYAEM/giphy.gif",
        likes_count=0,
        reblogs=0,
        comments_count=0,
        notes=0,
    )

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(marnie)
    db.session.add(marnie2)
    db.session.add(marnie3)
    db.session.add(bobbie)
    db.session.add(bobbie2)
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
