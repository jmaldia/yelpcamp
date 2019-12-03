let express     = require("express");
let router      = express.Router({mergeParams: true});
// Models
let Spot        = require("../models/spots");
let Review      = require("../models/reviews");
// Middleware
let middleWare  = require("../middleware");

// Show new review form
router.get("/new", middleWare.isLoggedIn, (req, res) => {
    Spot.findById(req.params.id, (err, spot) => {
        if (err) {
            console.log(err);
        } else {
            res.render("reviews/new", { spot: spot });
        }
    }) 
});
// Post route to add new review
router.post("/", middleWare.isLoggedIn, (req, res) => {
   Spot.findById(req.params.id, (err, spot) => {
        if (err) {
            console.log(err);
        } else {
            Review.create(req.body.review, (err, review) => {
                if (err) {
                    req.flash("error", "Something went wrong.");
                    console.log(err);
                } else {
                    // add username and id to review
                    review.author.id = req.user._id;
                    review.author.username = req.user.username;
                    // save review
                    review.save();
                    spot.reviews.push(review);
                    spot.save();
                    req.flash("success", "Successfully added review.");
                    setTimeout(() => {
                        res.redirect(`/spots/${spot._id}`)
                    }, 50);
                }
            })
        }
    });
});
// Edit post
router.get("/:review_id/edit", middleWare.checkReviewOwnership, (req, res) => {
    Review.findById(req.params.review_id, (err, foundReview) => {
        if(err) {
            res.redirect("back");
        } else {
            res.render("reviews/edit", {spot_id: req.params.id, review: foundReview});
        }
    });
    // Spot.findById(req.params.id, (err, foundSpot) => {
    //     res.render("spots/edit", {spot: foundSpot});
    // });
});
// Update route for edit
router.put("/:review_id", middleWare.checkReviewOwnership, (req, res) => {
    Review.findByIdAndUpdate(req.params.review_id, req.body.review, (err, updatedReview) => {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect(`/spots/${req.params.id}`);
        }
    })
});
// Delete review
router.delete("/:review_id", middleWare.checkReviewOwnership, (req, res) => {
    Review.findByIdAndRemove(req.params.review_id, (err) => {
        if(err) {
            res.redirect("back");
        } else {
            req.flash("success", "Review deleted.");
            res.redirect(`/spots/${req.params.id}`);
        }
    })
})


module.exports = router;