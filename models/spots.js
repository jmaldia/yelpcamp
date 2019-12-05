let mongoose    = require("mongoose");

// let Review      = require("reviews");

// SpotSchema.pre('remove', async function() {
// 	await Review.remove({
// 		_id: {
// 			$in: this.reviews
// 		}
// 	});
// });

// SCHEMA SETUP
let spotSchema = new mongoose.Schema({
    name        : String,
    minimum     : String,
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