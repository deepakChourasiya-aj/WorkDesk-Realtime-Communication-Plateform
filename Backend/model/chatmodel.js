const mongoose = require("mongoose")

const chatSchema = mongoose.Schema({
  userToken: {type: String, required: true},
  messages: [{from: {type: String, required: true}, message: {type: String, required: true},time: {type: String, required: true}}]
});

const ChatModel = mongoose.model("socket-chat-tokens", chatSchema);
module.exports = { ChatModel };