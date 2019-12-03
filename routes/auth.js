let express     = require("express");
let router      = express.Router();
// Authentication
let passport    = require('passport');
// MOdels
let User        = require("../models/user");

// Root route
router.get("/", (req, res) => {
    res.render("home");
});
// Register form
router.get("/register", (req, res) => {
    res.render("authenticate/register");
});
// Handle sign up logic
router.post("/register", (req, res) => {
    let newUser = new User({ username: req.body.username });

    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            req.flash("error", `Uh. oh. Something happened: ${err}`);
            return res.render("authenticate/register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", `Welcome to Rutherford Spots ${user.username}`);
            res.redirect("/spots");
        });
    });
})
// Login form
router.get("/login", (req, res) => {
    res.render("authenticate/login");
});
// Handle login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/spots",
        failureRedirect: "/login"
    }), (req, res) => {
    });

// Log out route
router.get("/logout", (req,res) => {
    req.logout();
    req.flash("success", "You've been logged out!")
    res.redirect("/login");
});

module.exports = router;