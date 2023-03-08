require("dotenv").config();
const express = require("express");
const controller  = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.get('/', controller.getalluser)
userRouter.post("/register",controller.signup);
userRouter.post('/login', controller.login)
userRouter.get('/:id', controller.getUser)
module.exports = { userRouter };

/*
    register user
    step 1: create api endpoint 
    step 2: destructure req.body
    step 3: find if the user is already registered
    step 4: not present then create a new user
    step 5: hash the password using bcrypt using callbacks

*/


/*
    login user
    step 1: create api endpoint 
    step 2: destructure req.body
    step 3: find if the registered user
    step 4: store hashpassword in variable
    step 5: compare hashpassword and normal password
    step 6: generate toekens 
    step 7: set cookie send response
    
    

*/





