create user -> post: localhost:8080/user/register  
    sample data : 
    
    {
      "name": "chikkuuu",
      "email": "chikkuuu@gmail.com",
      "password": "mayank"
    }
  ---    

   - login user ->    post : localhost:8080/user/login 
   - get new token -> get  : localhost:8080/newtoken
   - logout user   -> get  : localhost:8080/logout
   - get all user   -> get  : localhost:8080/user 
   - get one user   -> get  : localhost:8080/user/id 

      while making get request from fontend
      we need to send access_key(presented in .env)



----------------------------------------------------------------

github Oauth 

    1. Route login,dashboard 
    2. impelement auth 
    3. sessions
    4. protected
    5. logout 


