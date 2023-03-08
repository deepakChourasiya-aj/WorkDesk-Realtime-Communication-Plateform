const mongoose = require('mongoose');

const blacklistToken = mongoose.Schema({
    token: String
})

const BlackListToken = mongoose.model('blackListedToken',blacklistToken)

module.exports = {BlackListToken}