from app.models import db, Blog, environment, SCHEMA
from sqlalchemy.sql import text

def seed_blogs():
    demo = Blog(
        owner_id=1,
        default_blog=True,
        blog_title="Drawings and Prints",
        banner_img_url="https://i.pinimg.com/originals/9a/59/c5/9a59c5df94d97dce9e3bd1bad2275a2a.png",
        blog_avatar_url="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg",
        blog_name="demo",
        description="Dedicated to show drawings and prints from the past.",
    )
    marnie = Blog(
        owner_id=2,
        default_blog=True,
        blog_title="Literature and Love",
        banner_img_url="https://i.pinimg.com/736x/f1/29/93/f1299356706bd81065d4073774cc78de.jpg",
        blog_avatar_url="https://bookmarin.com/wp-content/uploads/2017/05/old-woman-reading-a-book-painting.jpg",
        blog_name="marnie",
        description="There is always love in reading...🌹",
    )
    bobbie = Blog(
        owner_id=3,
        default_blog=True,
        blog_title="Memes!",
        banner_img_url="https://media2.giphy.com/media/4oMoIbIQrvCjm/giphy.gif",
        blog_avatar_url="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_20/2860886/190517-grumpy-cat-mc-10372.JPG",
        blog_name="bobbie",
        description="Funny memes for your entertainment",
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
