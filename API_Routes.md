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
          "default_blog": true,
          "title": "This is my Blog Title!",
          "banner_img": banner.png,
          "blog_avatar": avatar.png,
          "blog_name": "Karen222",
          "description": "My name is Karen. 23/F"
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "posts":
          [{
            "id": 1,
            "blogId": 1,
            "userId": 1,
            "post_title": "Hello world",
            "post_type": "Text",
            "post_body": "I am new to this world",
            "post_caption":  "New person" ,
            "video_embed_code": "link",
            "image_embed_code": "link",
            "likes": 34,
            "reblogs": 1,
            "created_at": "date",
            "updated_at": "date"
          },
          {
            "id": 2,
            "blogId": 1,
            "userId": 3,
            "post_title": "Bye world",
            "post_type": "Text",
            "post_body": "I am not new to this world",
            "post_caption":  "Old person" ,
            "video_embed_code": "link",
            "image_embed_code": "link",
            "likes": 11,
            "reblogs": 2,
            "created_at": "date",
            "updated_at": "date"
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
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "posts": [
            {
              "id": 1,
              "blogId": 1,
              "userId": 1,
              "post_title": "First post",
              "post_type": "Text",
              "post_body": "I am new to this world",
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
              "blogId": 1,
              "userId": 1,
              "post_title": "Second post",
              "post_type": "Text",
              "post_body": "I am not new to this world",
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
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "posts": [
            {
              "id": 1,
              "blogId": 1,
              "userId": 3,
              "post_title": "First post",
              "post_type": "Text",
              "post_body": "I am new to this world",
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
              "blogId": 1,
              "userId": 3,
              "post_title": "different user post",
              "post_type": "Text",
              "post_body": "I am not new to this world",
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
      "title": "DaBlog",
      "url": "DaBlog.tumblr.com"
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
          "Title": "Title bs",
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
        "title": "Needs to be at least 8 characters",
        "url": "must be unique url"
      }
    }
    ```

### Add an Background Image to a Blog based on the Blog's id

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
      "url": "image url"
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

Updates and returns an existing Blog.

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
      "title": "DaBlog",
      "url": "DaBlog.tumblr.com"
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
      "url": "DaBlog.tumblr.com",
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
        "title": "Needs to be at least 8 characters",
        "url": "must be unique url"
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

Delete an existing background image for a Blog.

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

### Get all Post of the Current User

Returns all the posts posted by the current user.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/profile/current
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
          "post_body": "I am not new to this world",
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
      "post_body": "I am new to this world",
      "post_caption": "New person",
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
      "post_body": "I am new to this world",
      "post_caption": "New person",
      "video_embed_code (nullable)": "link",
      "image_embed_code (nullable)": "link",
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
        "post_title": "Must be at least 8 Characters long",
        "post_body": "Must be 10 characters long",
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
      "post_body (nullable)": "string",
      "post_caption": "urlLink"
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
      "post_body": "string",
      "post_caption": "urlLink",
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
      "post_body (nullable)": "string",
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
      "post_body": "string",
      "image_embed_code": "link",
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
      "post_body (nullable)": "string",
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
      "post_body": "string",
      "video_embed_code": "link",
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
      "post_body": "I am new to this world",
      "post_caption": "New person",
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
      "post_body": "I am new to this world",
      "post_caption": "New person",
      "video_embed_code (nullable)": "link",
      "image_embed_code (nullable)": "link",
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
        "post_body": "Must be 10 characters long",
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
