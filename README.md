
# WorkDesk https://workdesk.netlify.app/

Reatime screen sharing web application..

## Tech Stack

**Client:** HTML,CSS, Javascript

**Server:** Node, Express , MongoDB, WebRTC, PeerJS library, Socket.io


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

