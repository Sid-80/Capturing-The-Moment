const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:String,
    picture:String,
    email:String,
    id:String
});

module.exports = mongoose.model("Users",userSchema);