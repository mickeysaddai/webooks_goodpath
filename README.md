# Webooks_Goodpath

### Description
A simple RestFul Server that allows a user to signup/login,  make posts and register hooks.
The hooks are then fired as amside effect of business logic to the user or their posts.


<img width="665" alt="Screen Shot 2022-04-07 at 11 49 44 PM" src="https://user-images.githubusercontent.com/88467155/162359037-90127969-16fa-4bc4-96c0-4d28d2679fbe.png">


### How to run  the app
  * Clone the repo
  *npm install
  * npm install dependencies
  * Run the server : npm start or npm run devStart.


### Routes
* Users
  * /users/register - Post to register user
  * /users/login - Post to login user
  * /users - Get all users
  * 
* Posts
  * /posts - Get all posts
  * /posts/user/user_id - Get/Put/Delete posts for a specific user
  
 * Hooks
   * /hooks/user/user_id - Get hooks for user
   * /hooks/register - Post to register hook for a user
   * /hooks - Get all hooks for all users
  
  
  
