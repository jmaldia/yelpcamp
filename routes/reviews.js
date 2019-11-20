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
            Review.create(req.body.review, (err, review) => {
                if (err) {
                    console.log(err);
                } else {
                    // add username and id to review
                    review.author.id = req.user._id;
                    review.author.username = req.user.username;
                    // save review
                    review.save();
                    spot.reviews.push(review);
                    spot.save();
                    setTimeout(() => {
                        res.redirect(`/spots/${spot._id}`)
                    }, 0);
                }
            })
        }
    });
});

module.exports = router;