// require("dotenv").config({ path: "/Users/owaisazmi/Desktop/melted-group-7444/Backend/.env" });
require("dotenv").config();
const express = require('express');
const {Server} = require('socket.io');
const http = require('http');
const cors = require('cors');
// Import all packages
const app = express()
// cors for conecting with the frontend
app.use(cors({
    origin : '*'
}))
// creating a new server using http
const httpServer =  http.createServer(app)

app.get("/start" , (req,res) => {
    res.send("Welcome To WrokDesk Video Server")
})
// connected with the server
httpServer.listen(process.env.port , () => {
    console.log(`Server started at `+process.env.port);
})
// creating a new server for websocket
const io = new Server(httpServer , {
    cors : {
        origin : '*'
    }
})
// connecting websocket server 
io.on('connection' , (socket) => {

    socket.on('join-room' , (RoomID , userID) => {
        // const {RoomID,userID} = data
        console.log(RoomID , userID);
        socket.join(RoomID)
        socket.to(RoomID).emit('user-join' , userID)

        socket.on('disconnect' , () => {
            socket.to(RoomID).emit('user-disconnected', userID)
        })
    })

})