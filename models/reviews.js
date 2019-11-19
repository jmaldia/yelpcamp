let mongoose    = require("mongoose");

// SCHEMA SETUP
let reviewSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports =  mongoose.model("Review", reviewSchema);