let express = require("express");
let router  = express.Router();
// Models
let Spot    = require("../models/spots");

// Middleware
let isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    };
    res.redirect("/login")
}

// Show all spots
router.get("/", (req, res) => {
    // Get campgrounds from DB
    Spot.find({}, (err, allSpots) => {
        if (err) {
            console.log("OH NO, ERROR!", err);
        } else {
            res.render("spots/spots", { spots: allSpots, currentUser: req.user });
            console.log(allSpots);
        }
    });
});
// Post route to add new campground
router.post("/", isLoggedIn, (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    let newSpot = {
        name: name, 
        image: image,
        description: description, 
        author: author
    }
    // Create new campground on DB
    Spot.create(newSpot, (err, newlyCreatedSpot) => {
            if (err) {
                console.log("SOMETHING WENT WRONG!", err);
            } else {
                console.log("WE JUST CREATED A SPOT ON THE DB!");
                // console.log(newlyCreatedSpot);
                res.redirect("/spots");
            }
        });

    // campgrounds.push({ name: name, image: image }); - old code
});
// Show new spot form
router.get("/new", isLoggedIn, (req, res) => {
    res.render("new")
});
// Show spot detail
router.get("/:id", (req, res) => {
    let id = req.params.id;
    console.log(id)
    Spot.findById(req.params.id).populate("reviews").exec((err, foundSpot) => {
        if (err) {
            console.log("SOMETHING WENT WRONG!", err);
        } else {
            console.log(foundSpot)
            res.render("spots/show", { spot: foundSpot });
        }
    });
    // res.render("show", { id: id })
});
// Edit spot
router.get("/:id/edit", (req,res) => {
    Spot.findById(req.params.id, (err, foundSpot) => {
        if(err) {
            res.redirect("/spots");
        } else {
            res.render("spots/edit", {spot: foundSpot});
        }
    });
});
// Update spot 

module.exports = router;