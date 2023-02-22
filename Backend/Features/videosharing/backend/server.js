const express=require("express");
require("dotenv").config();
const app=express();

app.get("/",(req,res)=>{
    console.log("Working");
    res.send("working")
})

app.listen(8080,()=>{
    console.log("server is listning on 8080");
})