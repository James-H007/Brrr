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

    bobbie2 = Comment(post_id = 7, user_id = 3, comment = "Great insights here.")
    bobbie3 = Comment(post_id = 6, user_id = 3, comment = "I'm not sure what to think about this.")
    bobbie4 = Comment(post_id = 9, user_id = 3, comment = "Your perspective is really interesting.")
    bobbie5 = Comment(post_id = 2, user_id = 3, comment = "I enjoyed reading this post.")

    marnie = Comment(
        post_id = 1,
        user_id = 1,
        comment = "<3"
    )

    marnie2 = Comment(
        post_id = 2,
        user_id = 2,
        comment = "I wonder if she did have eyebrows..."
    )

    marnie3 = Comment(
        post_id = 4,
        user_id = 2,
        comment = "Really good anime, I loved it so much!"
    )

    marnie4 = Comment(post_id = 8, user_id = 2, comment = "I'm not sure what to think about this.")
    marnie5 = Comment(post_id = 3, user_id = 2, comment = "Great insights here.")
    marnie6 = Comment(post_id = 11, user_id = 2, comment = "Your writing style is engaging.")

    bobbie6 = Comment(post_id = 11, user_id = 3, comment = "I'm deeply impressed by the insights presented here.")
    bobbie7 = Comment(post_id = 8, user_id = 3, comment = "Your ability to articulate complex ideas is commendable.")
    bobbie8 = Comment(post_id = 9, user_id = 3, comment = "This analysis is incredibly thorough and detailed!")
    bobbie9 = Comment(post_id = 4, user_id = 3, comment = "Nice one!")
    bobbie10 = Comment(post_id = 5, user_id = 3, comment = "Totally agree with you.")
    bobbie11 = Comment(post_id = 7, user_id = 3, comment = "Short and sweet, but impactful.")

    db.session.add(demo)
    db.session.add(bobbie)
    db.session.add(bobbie2)
    db.session.add(bobbie3)
    db.session.add(bobbie4)
    db.session.add(bobbie5)
    db.session.add(bobbie6)
    db.session.add(bobbie7)
    db.session.add(bobbie8)
    db.session.add(bobbie9)
    db.session.add(bobbie10)
    db.session.add(bobbie11)
    db.session.add(marnie)
    db.session.add(marnie2)
    db.session.add(marnie3)
    db.session.add(marnie4)
    db.session.add(marnie5)
    db.session.add(marnie6)
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.blogs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
