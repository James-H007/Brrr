from app.models import db, environment, SCHEMA
from app.models.like import Like
from sqlalchemy.sql import text


def seed_likes():
    demo = Like(
        user_id=1,
        post_id=2,
        is_liked=True
    )
    marnie = Like(
        user_id=2,
        post_id=1,
        is_liked=True
    )
    james = Like(
        user_id=5,
        post_id=1,
        is_liked=True
    )
    matt = Like(
        user_id=4,
        post_id=2,
        is_liked=True
    )
    sterling = Like(
        user_id=6,
        post_id=1,
        is_liked=True
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
