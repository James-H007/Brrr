# Brrr-project (Tumblr Clone)

This is the starter for the Flask React project. We are cloning the popular website Tumblr.

Our clone will contain the following features:

User authorization, blogs, posts retaining to blogs, blog follows, post likes, image and video posting, and customization. All of these will appear in a feed on the homepage. Comments for post will be later added.

## Getting started

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
