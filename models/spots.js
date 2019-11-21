let mongoose    = require("mongoose");

// SCHEMA SETUP
let spotSchema = new mongoose.Schema({
    name        : String,
    image       : String, 
    description : String,
    reviews     : [ {
        type    : mongoose.Schema.Types.ObjectId,
        ref     : "Review"
    }],
    author      : {
        id      : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username: String
    }
});

module.exports =  mongoose.model("Spot", spotSchema);