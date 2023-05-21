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

## BrrrBlogs

### Feature: Create BrrrBlogs
- [ ] 1. When the logged in user clicks on the "person" icon on the navigation bar, there should be a drop down, that shows likes, following, and a list of the user's blogs. Above the stack of blogs, there should be a box with the text, "Blogs" and a "+ New" text which can be clicked on. Once clicked, the user should be navigated to the `/new/blog` route.
- [ ] 2. Once the user is redirected, the user must type in a `blog_title`and `blog_name`. The `blog_name` must be unique.
- [ ] 3. Error validations must appear at the top if the user fails to meet the form requirements. `"You must enter a title."` and `"You must enter a blog name"` are the two requirements. If the user chooses a blog name that is already taken, there should be an error that appears at the top saying `"Blog name is taken!"`
- [ ] 4. There should be a submit button on the bottom left of the page that says "Create Blog". Once the button is clicked, they will be redirected to the user's blog page.
- [ ] 5. There should be a 'cancel' button, when clicked it should redirect the user to their feed. When the user goes back all the inputs and error validations should return to their default state.

### Feature: Viewing BrrrBlogs
- [ ] 1. When the logged in user clicks on a `blog_name` or `blog_avatar` on their feed, they will be redirected to that user's blog. The route should be called `/:blog_name`.
- [ ] 2. The blog should have a similar functionality to a feed, but instead we only see the posts of the respective blog. At the top of the blog, we should see the blog's banner, title, avatar, description and name.
- [ ] 3. If the logged-in user is not following the blog owner, then there should be a `Follow` button at the top. Once clicked, the `Follow` button should turn into `Following` button. The user can toggle between following and not following the user with that button.
- [ ] 4. If the logged-in user is the owner of that blog, there should be a blue `Blog Settings` button. When clicked on it should take you to the `/settings/blog/:blog_name`. If the user tries to use this route to edit another blog that they do not own, redirect them to an error page. The error page should say unauthorized access.

### Feature: Editing BrrrBlogs
- [ ] 1. When the user clicks on "Blog Settings" when they are on their blog page or through the navigation bar drop menu, where they can also select "Blog Settings", they will be redirected to the `/settings/blog/:blog_name`. Authorization is required, if not, redirect the user to an error page.
- [ ] 2. When the user is in the blog settings page, they should should have an option to change their blog title, description, banner, avatar, and name. If the user tries to change their name to an already taken one, display an error next to the text field input which says, `"Blog name has been taken"`. When the user is in the process of editing the name, two new buttons should pop up "Cancel" and "Save". Pressing the "Save" button will attempt to change the blog name. The user should not have to refresh the page to see the changes.
- [ ] 3. There should be a preview of the icon and banner image with a button saying "Edit Appearance" on the top right of the banner display. This will pop up 4 new buttons on the page. A 'Cancel' and 'Save' button on the top right. Below the save button is a 'pencil' icon when clicked allows the user to change their banner. On the blog avatar, there should be another 'pencil' icon, when clicked it should allow the user to change their blog avatar. When either 'Cancel' or 'Save' is pressed, the following buttons should disappear and return to only the "Edit Appearance" button.

### Feature: Deleting BrrrBlogs
- [ ] 1. At the bottom of the `/settings/blog/:blog_name` page, there should be a red 'Delete <blog_name>` button. Once press, the user should be redirected to `/blog/:blog_name/delete` saying if the user is absolutely sure if they want to delete the blog. There should be an input for the user's email and password in order to verify this.
- [ ] 2. The submit button shoudl be a red button that says `Delete <blog_name>`. 
- [ ] 3. There should be a small underlined 'Nevermind' line underneath the submit button in the modal. It will redirect back to the previous page for the settings.
- [ ] 4. If the credentials for the email and password are correct and the submit button to delete is pressed, the forms should disappear and be told that the blog has been successfully deleted. The user can press a button to be redirected back to their feed.
- [ ] 5. The user should not be able to delete their main blog.

---

## BrrrPosts

### Feature: Create BrrrPosts

- [ ] 1. There should be a "pen icon" on the navigation bar on the right side for the logged-in users. There should also be 4 "post type" icons at the top of the feed.
- [ ] 2. Upon clicking the "pen icon" or any of the 4 "post type" icons, a modal should pop up which is a blank form to gather data for a new post.
- [ ] 3. In the modal, the header should be the blog name, to the top left of the modal box, there needs to be the blog avatar. Depending on the post type, there should be different inputs for the form.
- [ ] 4. On the blog name, the user should be able to click on the blog name. Clicking on the blog name will pop up another drop down modal to switch between the user's blogs. This will then be the blog that will be the owner of the new post.
- [ ] 5. The submit button should have the text 'Post'
- [ ] 6. The modal should have a button that says "Close". When clicked it, should bring up another modal with no background saying, "Discard this post?". There should be two buttons below it with the following text, "Nevermind" and "Discard". If "Nevermind" is pressed, return the user back the post form. None of the form inputs should be affected. If "Discard" is pressed, exit out of the form modal. 
- [ ] 7. The user should be able to exit by clicking outside of the modal.
- [ ] 8. For `Text` Post Types, there should be a caption that says "Title". There has to be a textarea below that will be inputted as a string inside the data. If both areas are empty, disable the submit button.
- [ ] 9. For `Image` Post Types, there should be an icon image of a camera with the placeholder text "Upload images underneath it". When the camera icon is clicked on, the user should receive a popup to upload an image from their computer. Validations should check if it's a `.png`, `.jpg`, `.jpeg`, '.gif'. The limit should be 2 MB. Alternatively, allow user to upload an image link. This should have a textarea input for users to add a description. If there is no image or image link, disable the submit button. If the image is uploaded or the image-url is inputted, show a thumbnail of the image and show the textarea box for the user to add a description. Hovering over a preview image should have an (x) button which allows the user to delete the image.
- [ ] 10. For `Link` Post Types, there should be a single text input field that will take in a url. Placeholder for input should be `Type or paste Link`. The submit button should be disabled until a URL has been inputted. Once a URL is inputted, show the url link, below it have two optional text inputs with the following placeholders, "Enter a title" and "Enter a summary". The text area field to add a description should also pop up once the URL has been inputted. 
- [ ] 11. For `Video` Post Types, there should be a video camera icon with a text input field below it with the placeholder "Upload Video URL". The submit button should be disabled if the field is empty. The user should be able to put in the URL. Once the URL is inputted, a preview of the video should be displayed. The textarea to add a description should also be included. 
- [ ] 12. When the user successfully submits a post, they should be redirected to the post they just created. 
- [ ] 13. Navigating outside of the modal and back to create a post should reset any erros and clears all data entered (back to its default state)
- [ ] 14. Error validations of incorrect data types should be placed below the blog name.
- [ ] 15. The url should contain a query url string with the blog_name and post type. For example if the blog's name is "Guest1" and they wanted to make an "image" post type, the url should change to `/new/photo?name=guest1`.

### Feature: BrrrFeed - List of Posts 
- [ ] 1. Navigation bar should be fixed on top of the page at all times.
- [ ] 2. The users should see posts based on the other users they follow in chronological order, from newest at the top to the oldest at the bottom. If the user isn't following anyone, they should be recommended some blogs to follow.
- [ ] 3. If a user is not logged in, the navigation bar should only have a "Log in" button on the top right. Their feed should be seeded data from default site admin posts.
- [ ] 4. Posts are stacked on top of each other. A post should have the blog's icon on the top left of the post box. The blog name it's from at the top left. Show a 'like' and 'comment' button. A display of notes which is the sum of "Likes" + "Reblogs" + "Comments".
- [ ] 5. Clicking on the blog name or blog avatar of the post should either have a modal pop up of the respective blog or redirect the user to the blog page.
- [ ] 6. Hovering over a blog name or blog avatar should show a pop up of the blog's banner, name, title, description, and avatar. There should also be a follow/unfollow button users can click on.

### Feature: View BrrrPost Details
- [ ] 1. Post details are similar to how they are viewed on a feed, but instead it's just a single post. Ex. Display Likes, Reblog and Comment Buttons. Show note counts. 
- [ ] 2. There should be a follow button next to the blog name, if the user is not following the user of that post. If they click on it, they should be now following that user and the follow button should disappear.
- [ ] 3. If a user clicks on the comment button or reblog button, have a pop up alert saying, "This feature has yet to be implemented." (Bonus: Implemenet the functionality)
- [ ] 4. If a user clicks on the like button, change the state of the heart from gray to red. The user can toggle between the 'like' button, which should dynamically change the note counts without having to refresh the page.
- [ ] 5. If a user is the owner of the post, they should be able to see 'cog' or 'triple dot' icon on the top right in the post. Clicking on it should show a dropdown which displays the time the post was updated/created. It should also show two choices stacked on top of each other. Edit and Delete. Clicking on the respective button will lead to the Feature: Edit Post or Feature: Delete Post.
- [ ] 6. If a user is the owner of the post, they should also see a 'pencil' and 'trashcan' icon that will lead to the 'Edit' and 'Delete' feature of the specific post. 

### Feature: Edit BrrrPost
- [ ] 1. Required Authentication. Clicking on the Edit Button which is located by clicking on the "triple dots" or "cog" will show a dropdown that will have an edit button. Clicking on the button will bring up a form.
- [ ] 2. A modal should pop up which is similar to "Posting a BrrPost". The url should change into `/edit/:blogName/:postId`.
- [ ] 3. The form will look different based on the 'Post Type'. It will have the information already filled out similar to 'Posting a BrrPost'. The user is free to edit the title, contents, and captions of the post.
- [ ] 4. It should have the same functionality of a 'Posting a BrrrPost'.
- [ ] 5. Instead of a "Submit" button, it should say "Save" instead. Upon clicking save, the changes will be added to the post.

### Feature: Delete BrrrPost
- [ ] 1. On click of the "trashcan" icon or "Delete" button from the dropdown menu, a modal pop up without any solid background should appear. It should say, "Are you sure you want to delete this post?" and then have two buttons "Cancel" and "OK". If 'cancel' is clicked on, end the modal. If the 'OK' button is clicked on, delete the post and end the modal. (Optional) Have an animation of the post fade away on delete. The post should be gone and the user should not have to refresh to see the post gone.
- [ ] 2. If the user is not the owner of the post, the delete buttons should be hidden.
- [ ] 3. Once the post is deleted, the post should not appear on any parts of the blog or website.
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
         
