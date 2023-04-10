const mongoose = require('mongoose');
// creating a new schema for blacklisting the token using mongoose
const blacklistToken = mongoose.Schema({
    token: String
})
// model for the blackling
const BlackListToken = mongoose.model('blackListedToken',blacklistToken)

module.exports = {BlackListToken}