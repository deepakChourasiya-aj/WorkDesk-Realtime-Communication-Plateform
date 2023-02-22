// chatroutes
const express = require("express")
const chatRouter = express.Router()



chatRouter.use(express.static("Frontend"));

chatRouter.get('/', (req, res)=>{
    res.send("CHAT ROUTE")
})




module.exports = {chatRouter}