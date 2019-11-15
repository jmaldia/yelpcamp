let mongoose    = require("mongoose");

// SCHEMA SETUP
let reviewSchema = new mongoose.Schema({
    text: String,
    author: String
});

module.exports =  mongoose.model("Review", reviewSchema);