let express = require("express");
let router  = express.Router({mergeParams: true});
// Models
let Spot    = require("../models/spots");
let Review    = require("../models/reviews");

// Middleware
let isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    };
    res.redirect("/login")
}

// Show new review form
router.get("/new", isLoggedIn, (req, res) => {
    Spot.findById(req.params.id, (err, spot) => {
        if (err) {
            console.log(err);
        } else {
            res.render("reviews/new", { spot: spot });
        }
    }) 
});
// Post route to add new review
router.post("/", isLoggedIn, (req, res) => {
   Spot.findById(req.params.id, (err, spot) => {
        if (err) {
            console.log(err);
        } else {
            // add username and id to comment
            req.user;
            // save comment
            Review.create(req.body.review, (err, review) => {
                if (err) {
                    console.log(err);
                } else {
                    spot.reviews.push(review);
                    spot.save();
                    res.redirect(`/spots/${spot._id}`)
                }
            })
        }
    });
});

module.exports = router;