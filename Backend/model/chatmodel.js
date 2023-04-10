const mongoose = require("mongoose")
// creating a new schema for the chat model
const chatSchema = mongoose.Schema({
  userToken: {type: String, required: true},
  messages: [{from: {type: String, required: true}, message: {type: String, required: true},time: {type: String, required: true}}]
});
// creating a new chat model
const ChatModel = mongoose.model("socket-chat-tokens", chatSchema);
module.exports = { ChatModel };