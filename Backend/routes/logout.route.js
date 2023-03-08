const express = require('express');
const fs = require('fs');
const { BlackListToken } = require('../model/blacklisttoken.model');

const LogoutRouter = express.Router();

LogoutRouter.get('/', async (req, res)=>{
    const Normal_Token = req.cookies.Normal_Token ||""

    const blacklisteddata = JSON.parse(fs.readFileSync("./blacklist.json","utf-8"))
    // token saving mongodb blacklist
    const blcklsttokn = new BlackListToken({token:Normal_Token})
    await blcklsttokn.save()
    blacklisteddata.push(Normal_Token);

    fs.writeFileSync("./blacklist.json",JSON.stringify(blacklisteddata))

    res.status(200).send("Log Out Successfully");
})
 
 
module.exports = {LogoutRouter}