let express     = require("express");
let bodyParser  = require("body-parser");
let mongoose    = require("mongoose");
// run server
let app = express();
// connect to mongo db
mongoose.connect("mongodb://localhost/yelp_camp");

// SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

let Campground = mongoose.model("Campground", campgroundSchema);

Campground.find({}, (err, campgrounds) => {
    if (err) {
        console.log("OH NO, ERROR!");
    } else {
        console.log(campgrounds);
    }
});

Campground.create({ 
        name: "Ganite Hill", 
        image: "https://d2s0f1q6r2lxto.cloudfront.net/pub/ProTips/wp-content/uploads/2015/09/camp-checklist.jpg" 
    }, (err, campground) => {
        if (err) {
            console.log("SOMETHING WENT WRONG!", err);
        } else {
            console.log("WE JUST CREATED A CAMPGROUND TO THE DB!");
            console.log(campground);
        }
    });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", { campgrounds: campgrounds });
});

// Post route to add new campground
app.post("/campgrounds", (req, res) => {
    let name = req.body.name;
    let image = req.body.image;

    campgrounds.push({ name: name, image: image });

    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new")
})

// Tell express to listen for requests -start server 
// start your app with this command: PORT=3000 node app.js
app.listen(process.env.PORT, process.env.IP, () =>{
    console.log("Yelp Camp Server has started")
});