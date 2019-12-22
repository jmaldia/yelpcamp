let express         = require("express");
let bodyParser      = require("body-parser");
let mongoose        = require("mongoose");
let flash            = require('connect-flash');
// Authentication
let passport        = require('passport');
let LocalStrategy   = require('passport-local');
// Routes
let methodOverride  = require("method-override");
let spotRoutes      = require("./routes/spots");
let reviewRoutes    = require("./routes/reviews");
let authRoutes      = require("./routes/auth");
// Model File(s)
// let Spot            = require("./models/spots");
// let Review          = require("./models/reviews");
let User            = require("./models/user");
// Run server
let app = express();
// Connect to mongo db
let databaseURL = process.env.DATABASEURL || "mongodb://localhost:27017/neighborhood_spots";
mongoose.connect(databaseURL, {useNewUrlParser: true, useUnifiedTopology: true});

// Seeding the database
// let seedDB          = require("./seeds"); // Seed file
// seedDB();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

// Passport configuration
app.use(require("express-session")({
    secret: "Once again I win cutest person!",
    resave: false, 
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// Use the Routes
app.use(authRoutes);
app.use("/spots", spotRoutes);
app.use("/spots/:id/reviews", reviewRoutes);

// Tell express to listen for requests -start server 
// start your app with this command: PORT=3012 nodemon app.js
app.listen(process.env.PORT, process.env.IP, () =>{
    console.log("Yelp Camp Server has started");
});