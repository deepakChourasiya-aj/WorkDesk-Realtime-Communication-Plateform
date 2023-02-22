// require ={express,UserModel,bcrypt,jsonwebtoken,dotenv}

require("dotenv").config();
const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

/*
    register user
    step 1: create api endpoint 
    step 2: destructure req.body
    step 3: find if the user is already registered
    step 4: not present then create a new user
    step 5: hash the password using bcrypt using callbacks

*/

userRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body);
        const isPresent = await UserModel.find({ email });

        if (isPresent.length === 0) {
            // encrypte password and register
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) res.status(401).json({ "errow ": err.message });
                else {
                    const newUser = new UserModel({
                        name,
                        email,
                        password: hash,
                    });
                    await newUser.save();
                    res.status(200).json({ success: "user registered successfully" });
                }
            });
        } else {
            res.status(404).json({ msg: "user already registered" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


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

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const UserData = await UserModel.findOne({ email });

        if (!UserData) {
            res.status(404).json({ message: "user not found" });
        }
        // hash password form UserData(db.users)
        const hashPassword = UserData?.password;

        // compare

        bcrypt.compare(password, hashPassword, (err, result) => {
            if (result) {
                // generate tokens 
                const Normal_Token = jwt.sign({ userId: UserData._id }, process.env.Normal_Token_key, { expiresIn: "7d" })
                const Refresh_Token = jwt.sign({ userId: UserData._id }, process.env.Refresh_Token_key, { expiresIn: "7d" })

                // send token in cookies
                res.cookie("Normal_Token", Normal_Token, { httpOnly: true })
                res.cookie("Refresh_Token", Refresh_Token, { httpOnly: true })
                res.status(200).json({ "message": "Login successfully", Normal_Token, Refresh_Token })
            }
            else {
                res.status(401).json({ "message": "error while login" });
            } 
        })


    } catch (error) {
        res.status(404).json({ message: error.message });
    }

})


module.exports = { userRouter };
