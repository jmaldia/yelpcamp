let mongoose    = require("mongoose");
let Spot        = require("./models/spots");
let Review      = require("./models/reviews");
 
let data = [
    {
        name : "Paisano's", 
        image : "http://m.paisanos.com/img/pasi-4.jpg", 
        description : "Italian restaurant cooking classic dishes in a warm space with a back patio & BYO alcohol policy."
    },
    {
        name : "Ferazzoli's Italian Kitchen", 
        image : "https://media-cdn.tripadvisor.com/media/photo-s/09/2c/24/9c/october-2015-4-great.jpg", 
        description : "All of our ingredients are fresh, local and of the highest quality. Enjoy all of our homemade family recipes."
    },
    {
        name : "Mambo Tea House", 
        image : "https://image-res-platform.s3.amazonaws.com/a4a09d51/import/clib/mamboteahousenj_com/dms3rep/multi/mobile/mambo9-400x266.jpg", 
        description : "Part BYOB restaurant with hearty Cuban & Latin classics, part Asian teahouse with 40+ teas."
    },
    { 
        name : "Sonoma Bistro", 
        image : "https://s3-media1.fl.yelpcdn.com/bphoto/eWOHdjOMx63_ZAZXhHcJVw/l.jpg", 
        description : "This relaxed venue offers a changing array of New American dishes & a chill vibe."
    },

    { 
        name : "Jim Dandy's", 
        image : "https://s3-media1.fl.yelpcdn.com/bphoto/FU_DvanDnVRnjoWvuQXr4w/l.jpg", 
        description : "Home of the Killer Ribs. BYOB Please feel free to bring your own bottle."
    },
    { 
        name : "Rutherford Pancake House", 
        image : "https://media-cdn.tripadvisor.com/media/photo-s/0a/d2/23/ce/rutherford-pancake-house.jpg", 
        description : "Classic eatery with homestyle American fare, including vegan options, & a casual country decor."
    }
    
]
 
function seedDB(){
   // Remove all spots
   Spot.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed rutherford spots!");
        Review.deleteMany({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed reviews!");
             // add a few spots
            data.forEach(function(seed){
                Spot.create(seed, function(err, spot){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a spot");
                        //create a review
                        Review.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Jim Ale"
                            }, function(err, review){
                                if(err){
                                    console.log(err);
                                } else {
                                    spot.reviews.push(review);
                                    spot.save();
                                    console.log("Created new review");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few reviews
}
 
module.exports = seedDB;