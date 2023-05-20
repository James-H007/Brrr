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

1. There should be a "pen icon" on the navigation bar on the right side for the logged-in users. There should also be 4 "post type" icons at the top of the feed.
2. Upon clicking the "pen icon" or any of the 4 "post type" icons, a modal should pop up which is a blank form to gather data for a new post.
3. In the modal, the header should be the blog title, to the top left of the modal box, there needs to be the blog avatar. Depending on the post type, there should be different inputs for the form.
4. On the blog title, t
5. The submit button should have the text 'Post'
6. The modal should have a button that says "Close". When clicked it, should bring up another modal with no background saying, "Discard this post?". There should be two buttons below it with the following text, "Nevermind" and "Discard". If "Nevermind" is pressed, return the user back the post form. None of the form inputs should be affected. If "Discard" is pressed, exit out of the form modal. 
7. The user should be able to exit by clicking outside of the modal.
8. For `Text` Post Types, there should be a caption that says "Title". There has to be a textarea below that will be inputted as a string inside the data. If both areas are empty, disable the submit button.
9. For `Image` Post Types, there should be an icon image of a camera with the placeholder text "Upload images underneath it". When the camera icon is clicked on, the user should receive a popup to upload an image from their computer. Validations should check if it's a `.png`, `.jpg`, `.jpeg`, '.gif'. The limit should be 2 MB. Alternatively, allow user to upload an image link. This should have a textarea input for users to add a description. If there is no image or image link, disable the submit button. If the image is uploaded or the image-url is inputted, show a thumbnail of the image and show the textarea box for the user to add a description.
10. For `Link` Post Types, there should be a single text input field that will take in a url. Placeholder for input should be `Type or paste Link`. The submit button should be disabled until a URL has been inputted. Once a URL is inputted, show the url link, below it have two optional text inputs with the following placeholders, "Enter a title" and "Enter a summary". The text area field to add a description should also pop up once the URL has been inputted. 
11. For `Video` Post Types, there should be a video camera icon with a text input field below it with the placeholder "Upload Video URL". The submit button should be disabled if the field is empty. The user should be able to put in the URL. Once the URL is inputted, a preview of the video should be displayed. The textarea to add a description should also be included. 
12. When the user successfully submits a post, they should be redirected to the post they just created. 
13. Navigating outside of the modal and back to create a post should reset any erros and clears all data entered (back to its default state)
__________

--- This will be a Modal. ---

* -I can create a post from the following actions, (clicking on either of these options will display a modal).
   * 1). Clicking on the "pen" icon to create a new post.
   * 2). Clicking on 1 of the 4 "post type" icons.
   
* -Creating a post.   
   * 3). When I arrive to the post Modal, I am able to put input data, ex.) "Text", "Image", "Video", "Link".
   * 4). Inputting correct data will allow the user to click on the "Create Post" button.
   * 5). After this the user will be redirected to the "/posts" route, where they can view their post.
   
__________

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
      * So that I can fix any errors I make in my BrrrTweets..

### Deleting BrrrPosts

* As a logged in user, I want to be able to delete my BrrrPosts by clicking a Delete button associated with the BrrrPosts anywhere that BrrrPosts appears.
  * When I'm on the `/feed`, `/posts/:id`, or `/users/:id/posts` pages:
    * I can click "Delete" to permanently delete a BrrrPosts I have posted.
      * So that when I realize I shouldn't have publicly said something, I can easily remove it.

### BrrBlogs
----
### Creating BrrrBlogs

* As a logged in user, I want to be able to create a BrrBlog.
   * -When I click on the User Icon (top right of page) 
     * When I'm on the `/blogs/new` page:
        * I can create blogs, with the "New Blog" button 
            * So I can create more BrrrPosts in this new blog or have different blogs for different purposes

### Viewing BrrrBlogs
* As a logged in user, I want to view other blogs.
    * When I'm on the `/explore` or `/:blog_title` page:
        * I can view other blogs and their contents
            * So I can see other blogs and see their memes
 
* As a logged in user, I want to be able to view all my blogs.
    * When I'm on the `/blogs` page:
        * I can view all my Blogs that I have created and see the follower count of each blog.
            * So I can see how many of my friends follow me and have different niches of blogs
    * When I'm on the `/blogs/:id` page:
        * I can view that specific blog with that specific id
            * So I can follow the blog or look through their posts
            * It will redirect me to `/:blog_title`

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
---
### BrrrFollows
---
### Follows
* As a logged in user, I want to be able to follow BrrBlogs
* When I am on `/feed`, `/blogs/:id`, `/explore`:
    * I can see other blogs to follow
       * So that I can follow blogs that I think I would enjoy to see on my feed.
### Followers
* As a logged in user, I want to be able to see my followers
    * When I am looking at my blog, I should be able to see how many followers that blog has
        * So I can count how many of my friends and other people are following me.
* Followers of my blog will see the contents of my blog show up on their feed in chronological order.
---
### BrrrLikes
---
### Likes
* As a logged in user, I want to be able to like posts
    * When I am looking at `/feed`, `/:blog_title` I can see the posts and like them
        * So I can like posts I find funny.
* As a logged in user, I want to see posts that I liked
    * When I'm on `/likes` page:
        * I can view what posts I like:
            * So I can look at the funny memes and cat videos I liked.
---
### BrrComments (Optional)
---
### Comments
* As a logged in user, I want to be able to comment on posts
  * When I am on `/:postId`:
    * I can comment on a post
        * So I can tell this blog poser I find funny
         
