from app.models import db, Blog, environment, SCHEMA
from sqlalchemy.sql import text

def seed_blogs():
    demo = Blog(
        owner_id=1,
        default_blog=True,
        blog_title="My Demo Blog",
        banner_img_url="https://img.freepik.com/premium-photo/wide-banner-with-many-random-square-hexagons-charcoal-dark-black-color_105589-1820.jpg",
        blog_avatar_url="https://64.media.tumblr.com/ac46b069c7bb24e2ee5bf368a32b84fe/5c65a2189e2d73b7-9d/s540x810/384c42854b3fca915f79ffcb8dc711665b7c3519.jpg",
        blog_name="demo",
        description="This is Demo User's blog",
    )
    marnie = Blog(
        owner_id=2,
        default_blog=True,
        blog_title="Marnie's Blog",
        banner_img_url="https://marketplace.canva.com/EAEiQaq0NWg/1/0/1600w/canva-orange-ebb-and-flow-abstract-linkedin-banner-5YDmHwJk-Yc.jpg",
        blog_avatar_url="https://64.media.tumblr.com/ac46b069c7bb24e2ee5bf368a32b84fe/5c65a2189e2d73b7-9d/s540x810/384c42854b3fca915f79ffcb8dc711665b7c3519.jpg",
        blog_name="marnie",
        description="This is Marnie's blog",
    )
    bobbie = Blog(
        owner_id=3,
        default_blog=True,
        blog_title="Bobbie's Blog",
        banner_img_url="https://marketplace.canva.com/EAENvp21inc/1/0/1600w/canva-simple-work-linkedin-banner-qt_TMRJF4m0.jpg",
        blog_avatar_url="https://64.media.tumblr.com/ac46b069c7bb24e2ee5bf368a32b84fe/5c65a2189e2d73b7-9d/s540x810/384c42854b3fca915f79ffcb8dc711665b7c3519.jpg",
        blog_name="bobbie",
        description="This is Bobbie's blog",
    )
    matt = Blog(
        owner_id=4,
        default_blog=True,
        blog_title="Matts's Blog",
        banner_img_url="https://media3.giphy.com/media/ZSvAC5c9RkW4g/giphy.gif",
        blog_avatar_url="https://i.pinimg.com/originals/56/2c/3a/562c3ab491bf2eae2a6754aa9ff3426d.gif",
        blog_name="matt",
        description="This is Matt's blog",
    )
    james = Blog(
        owner_id=5,
        default_blog=False,
        blog_title="James",
        banner_img_url="https://storage.googleapis.com/sticker-prod/NWMoyrnHU5eHTWIOh0bf/4.png",
        blog_avatar_url="https://storage.googleapis.com/sticker-prod/dRrf1qBdTGkY4YAmrLxL/0.png",
        blog_name="james_22",
        description="This is James' blog",
    )
    sterling = Blog(
        owner_id=6,
        default_blog=True,
        blog_title="Sterling",
        banner_img_url="https://media.tenor.com/0HECqkoCIgcAAAAC/the-fairly-odd-parents-timmy-turner.gif",
        blog_avatar_url="https://i.pinimg.com/originals/dd/82/fb/dd82fb0eb26c9045722b0a4e72d1d3f7.gif",
        blog_name="sterling",
        description="This is Sterling's blog",
    )
    anime = Blog(
        owner_id=7,
        default_blog=False,
        blog_title="Anime",
        banner_img_url="https://cdn.shopify.com/s/files/1/0559/4788/6783/files/Cowboy_Bebop.gif",
        blog_avatar_url="https://giffiles.alphacoders.com/398/3987.gif",
        blog_name="anime_22",
        description="This is an anime blog",
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(matt)
    db.session.add(james)
    db.session.add(sterling)
    db.session.add(anime)
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
