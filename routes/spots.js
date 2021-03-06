let express     = require("express");
let router      = express.Router();
// Models
let Spot        = require("../models/spots");
let Review      = require("../models/reviews");
// Middleware
let middleWare  = require("../middleware");
// Additional Modules
let fuzzySearch = require("fuzzy-search");

// Show all spots
router.get("/", (req, res) => {
    let allSpotsArr = [
        {
            name: "Restaurant 1", 
            description: "Restaurant 1 Description"
        },
        {
            name: "Restaurant 2 Rutherford", 
            description: "Restaurant 2 Description"
        },
        {
            name: "Restaurant 3 Rutherford", 
            description: "Restaurant 3 Description"
        }
    ]
    // Get campgrounds from DB
    Spot.find({}, (err, allSpots) => {
        const searcher = new fuzzySearch(allSpots, ['name', 'description'], {
            caseSensitive: false,
        });
        const result = searcher.search('pai');

        if (err) {
            console.log("OH NO, ERROR!", err);
        } else {
            res.render("spots/spots", { spots: result, currentUser: req.user });
            console.log(allSpots);
        }
    });
});
// Post route to add new campground
router.post("/", middleWare.isLoggedIn, (req, res) => {
    let name = req.body.name;
    let minimum = req.body.minimum;
    let image = req.body.image;
    let description = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    let newSpot = {
        name: name, 
        minimum: minimum,
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
router.get("/new", middleWare.isLoggedIn, (req, res) => {
    res.render("spots/new")
});
// Show spot detail
router.get("/:id", (req, res) => {
    let id = req.params.id;
    // console.log(id)
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
router.get("/:id/edit", middleWare.checkSpotOwnership, (req,res) => {
    Spot.findById(req.params.id, (err, foundSpot) => {
        res.render("spots/edit", {spot: foundSpot});
    });
});
// Update spot 
router.put("/:id", (req, res) => {
    Spot.findByIdAndUpdate(req.params.id, req.body.spot, (err, updatedSpot) => {
        if(err) {
            res.redirect("/spots");
        } else {
            res.redirect(`/spots/${req.params.id}`)
        }
    })
});
// Destroy spot
router.delete("/:id", (req, res) => {
    Spot.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            res.redirect("/spots");
        } else {
            // Review.deleteMany({_id: { $in: spotRemoved.reviews } }, (err) => {
            //     if (err) {
            //         console.log(err);
            //     }
            //     res.redirect("/spots");
            // });
            res.redirect("/spots");
        }
    });
});

module.exports = router;