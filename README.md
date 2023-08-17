# Brrr-project (Tumblr Clone)

This is the starter for the Flask React project. We are cloning the popular website Tumblr.

Our clone will contain the following features:

User authorization, blogs, posts retaining to blogs, blog follows, post likes, image and video posting, and customization. All of these will appear in a feed on the homepage. Comments for the post will be added later.


## Navigating through the website

### *Feed*

- In this section, users can post videos, links, photos, or just plain text   
- Users can also search for popular blogs in the search bar
- Users can view their feed and the latest posts on their favorite blogs in this section  

![image](https://github.com/James-H007/Brrr/assets/102698225/acbf53d3-3bae-4d1a-a7f3-72b1bd16e1a5)


### *Make a post*

- On the hero page, users can post their favorite photos, videos, links, etc.
- Implemented with AWS, explicitly utilizing Amazon S3 buckets for secure and scalable storage of media files such as images and videos
- Posts automatically render in their blog's feed

![image](https://github.com/James-H007/Brrr/assets/102698225/2bfae67c-3f0a-4b08-801b-b1c51bbcf02e)


### *Explore Blogs*

- In this section, users can view popular blogs associated with "Brrr"
- Users can choose to click on a blog where they will be taken to that blog's page   
- Feel free to follow blogs that catch your eye so they appear in your feed!

![image](https://github.com/James-H007/Brrr/assets/102698225/8f3f60d5-c67d-4058-8924-d2c04c8d682d)


### *Follows*

- In this section, users can view the blogs that they follow
- Recent posts associated with their followed blogs will appear on the hero page, or by simply clicking on the blog 

![image](https://github.com/James-H007/Brrr/assets/102698225/9d4301aa-4c7e-4a65-9409-e10b03f31dfa)


### *Likes*

- In this section, users can view the posts that they liked
- Each liked post will be associated with the blog
- Users can feel free to unlike posts as they wish

![image](https://github.com/James-H007/Brrr/assets/102698225/154c1a94-d1ea-4902-b0ee-13e1d7476fcc)




## Run it locally

1. Clone the repository

   ```
   https://github.com/James-H007/Brrr-Project.git
   ```

2. Install dependencies

   ```bash
   npm install
   pipenv install -r requirements.txt
   npm install aws-sdk
   pipenv install boto3
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

   Should look like this:

   ```bash
   SECRET_KEY= notSecret
   DATABASE_URL=sqlite:///dev.db
   SCHEMA=brrr_schema
   ```

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable. Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, first enter the following code below in the terminal to start the back-end:

   ```
   pipenv run flask run
   ```

8. Then run the front-end in a seperate split terminal, enter:

   ```
   npm start
   ```

9. Then navigate to http://localhost:3000
