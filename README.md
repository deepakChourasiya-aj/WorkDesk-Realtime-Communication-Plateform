
# WorkDesk https://workdesk.netlify.app/

Reatime screen sharing web application..

## Tech Stack

**Client:** HTML,CSS, Javascript,Bootsrap

**Server:** Node.js, Express.js , MongoDB, WebRTC, PeerJS library, Socket.io


## Frontend Part

- Home page
- Login/Signup
- Google OAuth 
- Github OAuth

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



### To use screen share feature -->
-  First Create room 
-  User can share the screen
-  Than user can join the room using room ID
-  Enter room ID to join 

### Stop share -->
- Click on stop share option 


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

![Screenshot (517)](https://user-images.githubusercontent.com/87657007/221489018-3cf389a2-7493-48e5-8c97-a01702eb78ee.png)

![Screenshot (518)](https://user-images.githubusercontent.com/87657007/221489038-db7b7ccd-86b1-441f-9ed9-aef1b489ea1f.png)
![Screenshot (519)](https://user-images.githubusercontent.com/87657007/221489043-ed9eabae-9d14-4f4c-bff5-d4fb58404d49.png)
![Screenshot (520)](https://user-images.githubusercontent.com/87657007/221489051-e6a06137-e7a4-42a7-9e5f-000eb14d6358.png)
![Screenshot (522)](https://user-images.githubusercontent.com/87657007/221489062-46235239-d888-4ca6-89fe-d5a8e4e05a48.png)
