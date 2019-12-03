// All middleware
// Models
let Spot        = require("../models/spots");
let Review      = require("../models/reviews");

let middlewareObj = {
    checkSpotOwnership: (req, res, next) => {
        if(req.isAuthenticated()) {
            Spot.findById(req.params.id, (err, foundSpot) => {
                if(err) {
                    req.flash("error", "Spot not found.");
                    res.redirect("back");
                } else {
                    if (foundSpot.author.id) {
                        if (foundSpot.author.id.equals(req.user._id)) {
                            next();
                        } else {
                            req.flash("error", "You don't have permission to do that.");
                            res.redirect("back");
                        }
                    } else {
                        req.flash("error", "You need to be logged in to do that.");
                        res.redirect("back");
                    }
                }
            });
        } else {
            res.redirect("back");
        };
    },
    checkReviewOwnership: (req, res, next) => {
        if(req.isAuthenticated()) {
            Review.findById(req.params.review_id, (err, foundReview) => {
                if(err) {
                    res.redirect("back");
                } else {
                    if (foundReview.author.id) {
                        if (foundReview.author.id.equals(req.user._id)) {
                            next();
                        } else {
                            res.redirect("back");
                        }
                    } else {
                        req.flash("error", "You don't have permission to do that.");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "You need to be logged in to do that.");
            res.redirect("back");
        };
    }, 
    isLoggedIn: (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        };
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("/login")
    }
};


module.exports = middlewareObj;