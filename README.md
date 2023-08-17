# Brrr (Tumblr-Inspired)

This is the starter for the Flask React project. We are cloning the popular website Tumblr.

Our clone will contain the following features:

User authorization, blogs, posts retaining to blogs, blog follows, post likes, image and video posting, and customization. All of these will appear in a feed on the homepage. Comments for the post will be added later.

## Live Link

https://brrr.onrender.com

## Technologies Used

<img src="https://camo.githubusercontent.com/442c452cb73752bb1914ce03fce2017056d651a2099696b8594ddf5ccc74825e/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6a6176617363726970742f6a6176617363726970742d6f726967696e616c2e737667" alt="drawing" width="50"/> <img src="https://camo.githubusercontent.com/27d0b117da00485c56d69aef0fa310a3f8a07abecc8aa15fa38c8b78526c60ac/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656163742f72656163742d6f726967696e616c2e737667" alt="react" width="50"> 
<img src="https://www.govconwire.com/wp-content/uploads/2018/03/AWS-EM-1.jpg" alt="aws" width="50"/> 
<img src="https://camo.githubusercontent.com/2b6b50702c658cdfcf440cef1eb88c7e0e5a16ce0eb6ab8bc933da7697c12213/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656475782f72656475782d6f726967696e616c2e737667" alt="redux" width="50"> 
<img src="https://www.pngall.com/wp-content/uploads/5/Python-PNG.png" alt="python" width ="50"> 
<img src="https://user-images.githubusercontent.com/92463844/162601723-beb79065-3555-4c2d-86c1-37d914e6d7ae.png" alt="flask" width ="50"> 
<img src="https://camo.githubusercontent.com/d536b9cc0c533324368535ece721f5424f28eae3ec0e6f3847408948ecacfce6/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f706f737467726573716c2f706f737467726573716c2d6f726967696e616c2e737667" alt="postgreSQL" width="50">
<img src="https://camo.githubusercontent.com/2e496d4bfc6f753ddca87b521ce95c88219f77800212ffa6d4401ad368c82170/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f637373332f637373332d6f726967696e616c2e737667" alt="css3" width="50"> 
<img src="https://camo.githubusercontent.com/da7acacadecf91d6dc02efcd2be086bb6d78ddff19a1b7a0ab2755a6fda8b1e9/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f68746d6c352f68746d6c352d6f726967696e616c2e737667" alt="html5" width="50"> 
<img src="https://camo.githubusercontent.com/dc9e7e657b4cd5ba7d819d1a9ce61434bd0ddbb94287d7476b186bd783b62279/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6769742f6769742d6f726967696e616c2e737667" alt="git" width="50"> 
<img src="https://camo.githubusercontent.com/5fa137d222dde7b69acd22c6572a065ce3656e6ffa1f5e88c1b5c7a935af3cc6/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f7673636f64652f7673636f64652d6f726967696e616c2e737667" alt="vscode" width="50"> 


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
