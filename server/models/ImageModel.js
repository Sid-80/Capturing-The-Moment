const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    caption:String,
    img:String,
},
{
    timestamps:true,
});

module.exports = mongoose.model("Images",imageSchema);