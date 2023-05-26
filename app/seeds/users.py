from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Dan', last_name='Smith', username='Demo', email='demo@aa.io', password='password', profile_pic_url='https://64.media.tumblr.com/d713916b3661f9cae54f9f880168a2f2/tumblr_ny5vbt2nLA1umv52oo2_500.png')
    marnie = User(
        first_name='Marnie', last_name='Jones', username='marnie', email='marnie@aa.io', password='password', profile_pic_url='https://64.media.tumblr.com/d713916b3661f9cae54f9f880168a2f2/tumblr_ny5vbt2nLA1umv52oo2_500.png')
    bobbie = User(
        first_name="Bobbie", last_name="Doe",username='bobbie', email='bobbie@aa.io', password='password', profile_pic_url='https://64.media.tumblr.com/d713916b3661f9cae54f9f880168a2f2/tumblr_ny5vbt2nLA1umv52oo2_500.png')

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
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
