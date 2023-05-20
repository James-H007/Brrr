# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
    * I receive a default blog on creation
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the lob-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a page displaying recent FauxTweets.
      * So that I can easily log out to keep my information secure.

## BrrrPosts

### Create BrrrPosts

* As a logged in user, I want to be able to post new BrrPosts.
  * When I'm on the `/blogs/:blogId/new` page:
    * I can write and submit a new BrrPost.
      * So that I can share my thoughts, memes with my friends or send cat videos.

### Viewing BrrrPosts

* As a logged in user, I want to be able to view a selection of the most recent BrrPosts.
  * When I'm on the `/feed` page:
    * I can view the ten most recently posted BrrrPosts.
      * So that I can read and interact with the thoughts and memes of who I'm following.

* As a logged in user, I want to be able to view a specific BrrPost and its associated BrrComments and BrrrLikes.
  * When I'm on the `/:postId` page:
    * I can view the content of the BrrPosts, as well as the associated BrrComments and BrrLikes.
      * So that I can read and interact with the thoughts and memes of my friends, and add my own thoughts in the BrrrComments.

### Updating BrrrPosts

* As a logged in user, I want to be able to edit my BrrPosts by clicking an Edit button associated with the BrrPost anywhere that BrrPost appears.
  * When I'm on the `/feed`, `/posts/:id`, or `/users/:id/posts` pages:
    * I can click "Edit" to make permanent changes to BrrrTweets I have posted.
      * So that I can fix any errors I make in my BrrrTweets.

### Deleting BrrrPosts

* As a logged in user, I want to be able to delete my BrrrPosts by clicking a Delete button associated with the BrrrPosts anywhere that BrrrPosts appears.
  * When I'm on the `/feed`, `/posts/:id`, or `/users/:id/posts` pages:
    * I can click "Delete" to permanently delete a BrrrPosts I have posted.
      * So that when I realize I shouldn't have publicly said something, I can easily remove it.

### BrrBlogs

### Creating BrrrBlogs

* As a logged in user, I want to be able to create a BrrBlog.
    * When I'm on the `/blogs/new` page:
        * I can create blogs
            * So I can create more BrrrPosts in this new blog or have different blogs for different purposes

### Viewing BrrrBlogs
* As a logged in user, I want to be able to view all my blogs.
    * When I'm on the `/blogs` page:
        * I can view all my Blogs that I have created and see the follower count of each blog.
            * So I can see how many of my friends follow me and have different niches of blogs

### Updating BrrrBlogs
* As a logged in user, I want to be able to edit my BrrBlogs by clicking an Edit button associated with the BrrrBlog anywhere that BrrrBlog appears.
    * When I'm on `/blogs` page:
        * I can click "Edit" to make permanent changes to BrrrBlogs I have created.
            * So that I can change banner images or blog profile pictures

### Deleting BrrrBlogs
* As a logged in user, I will be unable to delete the BrrBlog that was created on account creation. 
* As a logged in user, I want to be able to delete my BrrrBlog by clicking a Delete button associated with the BrrrBlog anywhere that BrrrBlogs appear.
    * When I'm on the `/blogs` page:
        * I can click "Delete" to permanently delete a BrrrPost I have posted.
            * So that when I am unhappy with a blog I own, I can easily delete it.
