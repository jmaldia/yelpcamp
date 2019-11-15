let mongoose    = require("mongoose");

// SCHEMA SETUP
let spotSchema = new mongoose.Schema({
    name: String,
    image: String, 
    description: String,
    comments: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

module.exports =  mongoose.model("Spot", spotSchema);