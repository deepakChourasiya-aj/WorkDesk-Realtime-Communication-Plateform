const mongoose = require('mongoose');
// creating a new schema for the user model
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    userid: String
})
// creating User model
const UserModel = mongoose.model('user',userSchema)

module.exports = {UserModel}