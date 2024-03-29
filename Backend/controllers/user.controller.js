// saving user data to the mongodv


require("dotenv").config();
// userModel expoting
const { UserModel } = require("../model/user.model");
// bcrypt pkg for the password hashing
const bcrypt = require("bcrypt");
// jwt token for the authentication token
const jwt = require("jsonwebtoken");
// signup Route
exports.signup = async (req, res) => {
    try {
        // getting data from body
        const { name, email, password } = req.body;
        // checking user in the database
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
                    // saving the new user to the database
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
}
// login Route
exports.login = async (req, res) => {
    try {
        // geting data from the body
        const { email, password } = req.body;
        // finding the user in the database with the email
        const UserData = await UserModel.findOne({ email });
        if (!UserData) {
            res.status(404).json({ message: "user not found" });
        }
        // hash password form UserData(db.users)
        const hashPassword = UserData?.password;

        // compare

        bcrypt.compare(password, hashPassword, (err, result) => {
            if (result) {
                // generate tokens for aithentication purpose
                const Normal_Token = jwt.sign({ userId: UserData._id }, process.env.Normal_Token_key, { expiresIn: "7d" })
                const Refresh_Token = jwt.sign({ userId: UserData._id }, process.env.Refresh_Token_key, { expiresIn: "7d" })

                // send token in cookies
                res.cookie("Normal_Token", Normal_Token, { httpOnly: true })
                res.cookie("Refresh_Token", Refresh_Token, { httpOnly: true })
                res.status(200).json({ "message": "Login successfully", Normal_Token, Refresh_Token,name:UserData["name"],email,userid:UserData["_id"]})
            }
            else {
                res.status(401).json({ "message": "error while login" });
            }
        })


    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}
// getting all user from the datavase
exports.getalluser = async (req, res) => {
    try {
        if (req.body.accesskey === process.env.access_key ) {

            const UserData = await UserModel.find();
            res.status(200).json({ UserData })
        }
        else {
            res.status(401).json({ message: "Access denied" });
        }
        
    }
    catch (error) {
        res.status(400).json({ message: error.message });
        
    }
}

// geting a perticular user with his unique id
exports.getUser = async (req, res) => {
        const _id = req.params.id;
        try {
            if (req.body.accesskey === process.env.access_key ) {
                const UserData = await UserModel.findOne({_id});
                res.status(200).json({ UserData })
            }
            else {
                res.status(401).json({ message: "Access denied" });
            }
            
        }
        catch (error) {
            res.status(400).json({ message: error.message });
            
        }
    }






// function he(){

//     bcrypt.compare("password", "$2b$05$Q0lP7ge0mc.WGKInJqYXz.bIvU67MkeG/zmLgXwo6e3nBgtWW3iJu", (err, result) => {
//         if (result) {
//             console.log(result);
//         }
//         else {
//             console.log("nhi");
//         }
//     })
// }

// he()
