from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    demo = Comment(
        post_id = 1,
        user_id = 2,
        comment = "I'm so glad that someone shares the same ideas at me. I feel like people care less and less about art these days and it's super disheartening. Thank you op for speaking the truth."
    )

    bobbie = Comment(
        post_id = 1,
        user_id = 3,
        comment = "It's not that deep."
    )

    marnie = Comment(
        post_id = 1,
        user_id = 1,
        comment = "<3"
    )


    db.session.add(demo)
    db.session.add(bobbie)
    db.session.add(marnie)
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.blogs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
