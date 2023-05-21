
![logo](https://user-images.githubusercontent.com/87657007/221491845-03166e0e-baa5-4077-957c-7924e578afa1.png)
# WorkDesk https://workdesk.netlify.app/

Reatime screen sharing web application..



## Tech Stacks Used

<p align = "center">
<img src="https://github.com/PrinceCorwin/Useful-tech-icons/blob/main/images/HTML.png" alt="html" width="55" height="55"/>
<img src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" alt="CSS" width="50" height="55"/>
<img src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="js" width="50" height="50"/>
<img src="https://raw.githubusercontent.com/PrinceCorwin/Useful-tech-icons/main/images/nodejs.png" alt="nodejs" width="50" height="50"/>
<img src="https://res.cloudinary.com/kc-cloud/images/f_auto,q_auto/v1651772163/expressjslogo/expressjslogo.webp?_i=AA" alt="express" width="50" height="50"/>
 <img src="https://raw.githubusercontent.com/PrinceCorwin/Useful-tech-icons/main/images/mongodb-leaf.png" alt="mongo" width="50" height="50"/> 
<img src="https://user-images.githubusercontent.com/25181517/182884894-d3fa6ee0-f2b4-4960-9961-64740f533f2a.png" alt="redis" width="50" height="50"/>
<img src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="npm" width="50" height="50"/>
  
</p>

**Client:** HTML,CSS, Javascript,Bootsrap

**Server:** Node.js, Express.js , MongoDB, WebRTC, PeerJS library, Socket.io


## Frontend Part

- Home page
- Login/Signup

## Backend Part
- Authentication using JWT
- Mongoose - connecting the database
- Server side -->> Node.js and Express 
### Database - 
    - MongoDB

## Features 
 -  Screen Sharing 
 -  Chatting 
 -  Vedio calling
## Application Guide



### To use {Screen share} feature -->
-  First Create room 
-  User can share the screen
-  Than user can join the room using room ID
-  Enter room ID to join 

#### Stop share -->
- Click on stop share option 

### To use {Video calling} feature -->
-  First Create room 
-  User can join the call by using the room ID
-  To end the call click on hang on button

### To use {Chat} feature -->
-  Enter the user name 
-  User can chat with online users
-  For online users  it will show green tick




## Examples
 #### Creating connection and accessing user media .
```javascript
    peer = new Peer(room_id);
    peer.on('open', (id) => {
        console.log("Peer has joined ID no", id);
        hideModal()
        // media options...
        getUserMedia({ video: true, audio: true },
            (stream) => {
                local_stream = stream;
                setLocalStream(local_stream)
            }, (err) => {
                console.log(err);
            })
        notify("Waiting for the member to join.")
    })
```

# Backend api endpoints
create user -> post: localhost:8080/user/register  
    sample data : 
    
    {
      "name": "User",
      "email": "User@gmail.com",
      "password": "User"
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

### Installation
To install the WorkDesk, follow these steps:

1. Clone the repository:
```
https://github.com/deepakChourasiya-aj/melted-group-7444.git
```

2. Install the dependencies:
```
cd melted-group
npm install
```

Start the server:
```
npm run server
```

You are good to go


<br>

System_design

![Untitled Diagram](https://user-images.githubusercontent.com/87657007/225451422-8d5c05ca-5046-4c10-b890-1f02bbcd3d73.jpg)


![Screenshot (517)](https://user-images.githubusercontent.com/87657007/221489018-3cf389a2-7493-48e5-8c97-a01702eb78ee.png)

![Screenshot (518)](https://user-images.githubusercontent.com/87657007/221489038-db7b7ccd-86b1-441f-9ed9-aef1b489ea1f.png)
![Screenshot (519)](https://user-images.githubusercontent.com/87657007/221489043-ed9eabae-9d14-4f4c-bff5-d4fb58404d49.png)
![image](https://user-images.githubusercontent.com/109690823/230712966-a9333eae-c068-41f9-9ca1-f1346a75eb75.png)
![Screenshot (520)](https://user-images.githubusercontent.com/87657007/221489051-e6a06137-e7a4-42a7-9e5f-000eb14d6358.png)
![Screenshot (522)](https://user-images.githubusercontent.com/87657007/221489062-46235239-d888-4ca6-89fe-d5a8e4e05a48.png)
