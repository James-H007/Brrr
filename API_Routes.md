## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

- Request: endpoints that require authentication
- Error Response: Require authentication

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

- Request: endpoints that require proper authorization
- Error Response: Require proper authorization

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/session
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: /api/session
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

- Error Response: Invalid credentials

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: /api/users
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "token": ""
    }
    ```

- Error response: User already exists with the specified email

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

- Error response: User already exists with the specified username

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

## Blogs

### Get all Blogs

Returns all the Blogs.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/blogs
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ````json
    {
      "Blogs": [
        {
          "id": 1,
          "owner_id": 1,
          "title": "Title bs",
          "default_blog": true,
          "banner_img":"banner.png",
          "blog_avatar":"avatar.png",
          "blog_name":"Gardner",
          "description":"Welcome to my Blog!",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "posts":
          [{
            "id": 1,
            "blogId": 1,
            "userId": 1,
            "post_title": "Hello world",
            "post_type": "Text",
            "post_description": "I am new to this world",
            "video_embed_code": "link",
            "image_embed_code": "link",
            "likes": 34,
            "reblogs": 1,
            "comments":1,
            "notes":36,
            "created_at": "2021-11-19 20:39:36",
            "updated_at": "2021-11-19 20:39:36"
          },
          {
            "id": 2,
            "blogId": 1,
            "userId": 3,
            "post_title": "Bye world",
            "post_type": "Text",
            "post_description": "I am not new to this world",
            "video_embed_code": "link",
            "image_embed_code": "link",
            "likes": 11,
            "reblogs": 2,
            "comments":1,
            "notes":14,
            "created_at": "2021-11-19 20:39:36",
            "updated_at": "2021-11-19 20:39:36"
          }]
        }
      ]
    }
    ``` text, video, link, image
    ````

### Get all Blogs created by the Current User

Returns all the Blogs owned (created) by the current user.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/blogs/current
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Blogs": [
        {
          "id": 1,
          "ownerId": 1,
          "Title": "Title bs",
          "default_blog": true,
          "banner_img":"banner.png",
          "blog_avatar":"avatar.png",
          "blog_name":"Gardner",
          "description":"Welcome to my Blog!",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "posts": [
            {
              "id": 1,
              "blogId": 1,
              "userId": 1,
              "post_title": "First post",
              "post_type": "Text",
              "post_description": "I am new to this world",
              "video_embed_code": "link",
              "image_embed_code": "link",
              "likes": 34,
              "reblogs": 1,
              "comments":1,
              "notes":36,
              "created_at": "2021-11-19 20:39:36",
              "updated_at": "2021-11-19 20:39:36"
            },
            {
              "id": 2,
              "blogId": 1,
              "userId": 1,
              "post_title": "Second post",
              "post_type": "Text",
              "post_description": "I am not new to this world",
              "post_caption": "Old person",
              "video_embed_code": "link",
              "image_embed_code": "link",
              "likes": 11,
              "reblogs": 2,
              "comments":1,
              "notes":14,
              "created_at": "2021-11-19 20:39:36",
              "updated_at": "2021-11-19 20:39:36"
            }
          ]
        }
      ]
    }
    ```

### Get Posts of a Blog from an id

Returns the details of a Blog specified by its id.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/blogs/:Id
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Blogs": [
        {
          "id": 1,
          "ownerId": 1,
          "Title": "Title bs",
          "default_blog": true,
          "banner_img":"banner.png",
          "blog_avatar":"avatar.png",
          "blog_name":"Gardner",
          "description":"Welcome to my Blog!",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "posts": [
            {
              "id": 1,
              "blogId": 1,
              "userId": 3,
              "post_title": "First post",
              "post_type": "Text",
              "post_description": "I am new to this world",
              "post_caption": "New person",
              "video_embed_code": "link",
              "image_embed_code": "link",
              "likes": 34,
              "reblogs": 1,
              "comments":1,
              "notes":36,
              "created_at": "2021-11-19 20:39:36",
              "updated_at": "2021-11-19 20:39:36"
            },
            {
              "id": 2,
              "blogId": 1,
              "userId": 3,
              "post_title": "different user post",
              "post_type": "Text",
              "post_description": "I am not new to this world",
              "post_caption": "Old person",
              "video_embed_code": "link",
              "image_embed_code": "link",
              "likes": 11,
              "reblogs": 2,
              "comments":1,
              "notes":36,
              "created_at": "2021-11-19 20:39:36",
              "updated_at": "2021-11-19 20:39:36"
            }
          ]
        }
      ]
    }
    ```

- Error response: Couldn't find a Blog with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Blog couldn't be found",
      "statusCode": 404
    }
    ```

### Create a Blog

Creates and returns a new Blog.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/blogs/new
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "title": "Welcome to the Blog!",
      "blog_name": "Dunder888"
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
       {
      "Blogs": [
        {
          "id": 1,
          "ownerId": 1,
          "title": "Welcome to the blog",
          "default_blog": True,
          "banner_img":"banner.png",
          "blog_avatar":"default.png",
          "blog_name": "Dunder888",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "posts": [
            {
             "message": "No posts Available, Learn how to make a post."
            },
          ]
        }
      ]
    }
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "title": "Needs to be at least 5 characters",
        "blog_name": "The blog name must be unique!"
      }
    }
    ```

### Add a Banner Image to a Blog based on the Blog's id

needs work

Create and return a new image for a Blog specified by id.

- Require Authentication: true
- Require proper authorization: Blog must belong to the current user
- Request

  - Method: POST
  - URL: /api/blogs/:blogId/
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "url": "image url"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "banner_img": "image url"
    }
    ```

- Error response: Couldn't find a Blog with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Blog couldn't be found",
      "statusCode": 404
    }
    ```

### Edit a Blog

Updates and returns an existing Blog. The user can edit the avatar, banner, description, and title.

- Require Authentication: true
- Require proper authorization: Blog must belong to the current user
- Request

  - Method: PUT
  - URL: /api/blogs/:blogId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "title": "DaBlog2",
      "blog_avatar": "avatar2.png",
      "banner_img": "banner2.png",
      "description": "This is a new description"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "title": "DaBlog",
      "blog_avatar": "avatar2.png",
      "banner_img": "banner2.png",
      "description": "This is a new description",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "title": "Needs to be at least 5 characters",
        "blog_avatar": "Must be a proper image type",
        "banner_img": "Must be a proper image type"
      }
    }
    ```

- Error response: Couldn't find a Blog with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Blog couldn't be found",
      "statusCode": 404
    }
    ```

### Delete a Blog

Deletes an existing Blog.

- Require Authentication: true
- Require proper authorization: Blog must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/blogs/:blogId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

- Error response: Couldn't find a Blog with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Blog couldn't be found",
      "statusCode": 404
    }
    ```

    ### Delete a Blog Image

Delete an existing banner image for a Blog.

- Require Authentication: true
- Require proper authorization: Blog must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/blogs/:blogId/banner
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

- Error response: Couldn't find a Blog Image with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Blog Image couldn't be found",
      "statusCode": 404
    }
    ```

## Posts

### Get all Post of the Current Blog the User is on

Returns all the posts posted by the current blog by the user.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/blogs/:id/posts
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Posts": [
        {
          "id": 1,
          "blogId": 1,
          "userId": 3,
          "post_title": "First post",
          "post_type": "Text",
          "post_description": "I am new to this world",
          "post_caption": "New person",
          "video_embed_code": "link",
          "image_embed_code": "link",
          "likes": 34,
          "reblogs": 1,
          "created_at": "date",
          "updated_at": "date"
        },
        {
          "id": 2,
          "blogId": 2,
          "userId": 3,
          "post_title": "second user post",
          "post_type": "Text",
          "post_description": "I am not new to this world",
          "post_caption": "Old person",
          "video_embed_code": "link",
          "image_embed_code": "link",
          "likes": 11,
          "reblogs": 2,
          "created_at": "date",
          "updated_at": "date"
        }
      ]
    }
    ```

### Create a Text Post for a Blog based on the Blog's id

Create and return a new post for a Blog specified by id.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/blogs/:blogId/new
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "post_title": "First post",
      "post_type": "Text",
      "post_description": "I am new to this world",
      "video_embed_code (nullable)": "link",
      "image_embed_code (nullable)": "link"
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "blogId": 1,
      "post_title": "First post",
      "post_type": "Text",
      "post_description": "I am new to this world",
      "post_caption": "New person",
      "video_embed_code (nullable)": "link",
      "image_embed_code (nullable)": "link",
      "Likes": 0,
      "Reblogs": 0,
      "Comments":0,
      "Notes":0,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "post_title": "Must be at least 8 Characters long",
        "post_description": "Must be 10 characters long",
        "post_caption": "Much be 8 Characters long",
        "video_embed_code (nullable)": "Must be valid link",
        "image_embed_code (nullable)": "Must be valid link"
      }
    }
    ```

- Error response: Couldn't find a Blog with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Blog couldn't be found",
      "statusCode": 404
    }
    ```

### Create a Link Post for a Blog based on the Blog's id

Create and return a new post for a Blog specified by id.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/blogs/:blogId/new
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "post_type": "Link",
      "post_description (nullable)": "string",
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "blogId": 1,
      "post_type": "Link",
      "post_description": "string",
      "Likes": 0,
      "Reblogs": 0,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "post_caption": "Must be valid link"
      }
    }
    ```

- Error response: Couldn't find a Blog with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Blog couldn't be found",
      "statusCode": 404
    }
    ```

  ### Create a Photo Post for a Blog based on the Blog's id

Create and return a new photo post for a Blog specified by id.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/blogs/:blogId/new
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "post_type": "Photo",
      "post_description (nullable)": "string",
      "image_embed_code": "link"
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "blogId": 1,
      "post_type": "Link",
      "post_description": "string",
      "image_embed_code": "link",
      "Likes": 0,
      "Reblogs": 0,
      "Comments":0,
      "Notes":0,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "image_embed_code (nullable)": "Must be valid link"
      }
    }
    ```

- Error response: Couldn't find a Blog with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Blog couldn't be found",
      "statusCode": 404
    }
    ```

### Create a Video Post for a Blog based on the Blog's id

Create and return a new video post for a Blog specified by id.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/blogs/:blogId/new
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "post_type": "Photo",
      "post_description (nullable)": "string",
      "video_embed_code": "link"
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "blogId": 1,
      "post_type": "Link",
      "post_description": "string",
      "video_embed_code": "link",
      "Likes": 0,
      "Reblogs": 0,
      "Comments":0,
      "Notes":0,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "video_embed_code (nullable)": "Must be valid link"
      }
    }
    ```

- Error response: Couldn't find a Blog with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Blog couldn't be found",
      "statusCode": 404
    }
    ```

### Edit a Post

Update and return an existing post.

- Require Authentication: true
- Require proper authorization: post must belong to the current user
- Request

  - Method: PUT
  - URL: /api/blogs/:blogId/:postId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "post_title": "First post",
      "post_type": "Text",
      "post_description": "I am new to this world",
      "video_embed_code (nullable)": "link",
      "image_embed_code (nullable)": "link"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "blogId": 1,
      "post_title": "First post",
      "post_type": "Text",
      "post_description": "I am new to this world",
      "video_embed_code (nullable)": "link",
      "image_embed_code (nullable)": "link",
      "Likes": 0,
      "Reblogs":0,
      "Comments":0,
      "Notes":0,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "post_title": "Must be at least 8 Characters long",
        "post_type": "Must select post type",
        "post_description": "Must be 10 characters long",
        "post_caption": "Much be 8 Characters long",
        "video_embed_code (nullable)": "Must be valid link",
        "image_embed_code (nullable)": "Must be valid link"
      }
    }
    ```

- Error response: Couldn't find a Post with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Post couldn't be found",
      "statusCode": 404
    }
    ```

### Delete a Post

Delete an existing Post.

- Require Authentication: true
- Require proper authorization: Post must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/blogs/:blogId/:postId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

- Error response: Couldn't find a Post with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Post couldn't be found",
      "statusCode": 404
    }
    ```

### Delete a Post Image

Delete an existing image for a Post.

- Require Authentication: true
- Require proper authorization: Post must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/blogs/:blogId/:postId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

- Error response: Couldn't find a Post Image with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Post Image couldn't be found",
      "statusCode": 404
    }
    ```

## Likes

### Allow the user to see all the posts they liked

-Require Authentication: True

-Require Authorization: True, must be logged in to see current user's likes

  - Method: GET
  - URL: /api/likes
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Posts": [
        {
          "id": 1,
          "blogId": 1,
          "userId": 3,
          "post_title": "First post",
          "post_type": "Text",
          "post_description": "I am new to this world",
          "post_caption": "New person",
          "video_embed_code": "link",
          "image_embed_code": "link",
          "likes": 34,
          "reblogs": 1,
          "created_at": "date",
          "updated_at": "date"
        },
        {
          "id": 2,
          "blogId": 2,
          "userId": 3,
          "post_title": "second user post",
          "post_type": "Text",
          "post_description": "I am not new to this world",
          "post_caption": "Old person",
          "video_embed_code": "link",
          "image_embed_code": "link",
          "likes": 11,
          "reblogs": 2,
          "created_at": "date",
          "updated_at": "date"
        }
      ]
    }
    ```

### Give a post a like
-Require Authentication: True

  - Method: POST
  - URL: /api/posts/:postId/likes
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "post_id": 2,
      "user_id": 1,
      "is_liked": true
    }
    ```

  - Successful Response


  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 2,
      "userId": 1,
      "blogId": 1,
      "post_type": "Link",
      "post_description": "string",
      "video_embed_code": "link",
      "Likes": 1,
      "Reblogs": 0,
      "Comments":0,
      "Notes":1,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

  - Error response: Couldn't find a Post with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Post couldn't be found",
      "statusCode": 404
    }
    ```

### Unlike a post

Update and return an existing post.

- Require Authentication: true
- Require proper authorization: Post must have been liked by the user
- Request

  - Method: PUT
  - URL: /api/posts/:postId/likes
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "post_id": 2,
      "user_id": 1,
      "is_liked": false
    }
    ```

      - Successful Response


  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 2,
      "userId": 1,
      "blogId": 1,
      "post_type": "Link",
      "post_description": "string",
      "video_embed_code": "link",
      "Likes": 0,
      "Reblogs": 0,
      "Comments":0,
      "Notes":0,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

  - Error response: Couldn't find a Post with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Post couldn't be found",
      "statusCode": 404
    }
    ```

## Follows

### Allow the user to see all the blogs they are following

-Require Authentication: True

-Require Authorization: True, must be logged in to see current user's likes

  - Method: GET
  - URL: /api/blogs/following
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Blogs": [
        {
          "id": 1,
          "owner_id": 1,
          "title": "Title bs",
          "default_blog": true,
          "banner_img":"banner.png",
          "blog_avatar":"avatar.png",
          "blog_name":"Gardner",
          "description":"Welcome to my Blog!",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
        },
        {
          "id": 2,
          "owner_id": 2,
          "title": "Title bs2",
          "default_blog": true,
          "banner_img":"banner2.png",
          "blog_avatar":"avatar2.png",
          "blog_name":"Gardner2",
          "description":"Welcome to my Blog!",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
        }
      ]
    }
    ```

### See all the user's followerss
-Require Authentication: True

-Require Authorization: True, must be logged in to see current user's likes

  - Method: GET
  - URL: /api/blogs/followers
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Users": [
        {
          "id":1,
          "first_name":"Jane",
          "last_name":"Smith",
          "email":"jSmith88@gmail.com",
          "username":"JSmith",
        },
        {
          "id":2,
          "first_name":"John",
          "last_name":"Smith",
          "email":"jSmith77@gmail.com",
          "username":"JSmith2",
        }
      ]
    }
    ```


### Follow A Blog
-Require Authentication: True

  - Method: POST
  - URL: /api/posts/:postId/likes
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "user_id": 2,
      "blog_id": 1,
      "is_following": true
    }
    ```

  - Successful Response


  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "user_id":2,
      "is_following":true
    }
    ```

  - Error response: Couldn't find a Blog with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Blog couldn't be found",
      "statusCode": 404
    }
    ```

### Unfollow a Blog

Update and return an existing post.

- Require Authentication: true
- Require proper authorization: Post must have been liked by the user
- Request

  - Method: PUT
  - URL: /api/posts/:postId/likes
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "user_id":2,
      "is_following":false
    }
    ```

      - Successful Response


  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "user_id":2,
      "is_following":false
    }
    ```

  - Error response: Couldn't find a Blog with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Blog couldn't be found",
      "statusCode": 404
    }
    ```
