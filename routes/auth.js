let express     = require("express");
let router      = express.Router();
// Authentication
let passport    = require('passport');
// MOdels
let User        = require("../models/user");

// Middleware
let isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    };
    res.redirect("/login")
}

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
            console.log(err);
            return res.render("authenticate/register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/spots");
        });
    });
})
// Login form
router.get("/login", (req, res) => {
    res.render("authenticate/login", {message: req.flash("error")});
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
    res.redirect("/login");
});

module.exports = router;