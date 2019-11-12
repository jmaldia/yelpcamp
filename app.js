let express     = require("express");
let bodyParser  = require("body-parser");
let mongoose    = require("mongoose");
// run server
let app = express();
// connect to mongo db
mongoose.connect("mongodb://localhost:27017/neighborhood_spots", {useNewUrlParser: true, useUnifiedTopology: true});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// SCHEMA SETUP
let spotSchema = new mongoose.Schema({
    name: String,
    image: String, 
    description: String
});

let Spot = mongoose.model("Spot", spotSchema);

// EXPRESS ROUTES
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/spots", (req, res) => {
    // Get campgrounds from DB
    Spot.find({}, (err, allSpots) => {
        if (err) {
            console.log("OH NO, ERROR!");
        } else {
            res.render("spots", { spots: allSpots });
            console.log(allSpots);
        }
    });
});

// Post route to add new campground
app.post("/spots", (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newSpot = {
        name: name, 
        image: image,
        description: description
    }

    // Create new campground on DB
    Spot.create(newSpot, (err, newlyCreatedSpot) => {
            if (err) {
                console.log("SOMETHING WENT WRONG!", err);
            } else {
                console.log("WE JUST CREATED A SPOT ON THE DB!");
                console.log(newlyCreatedSpot);
                res.redirect("/spots");
            }
        });

    // campgrounds.push({ name: name, image: image }); - old code
});

app.get("/spots/new", (req, res) => {
    res.render("new")
});

app.get("/spots/:id", (res, req) => {

    res.setEncoding("SHOW PAGE");
});

// Tell express to listen for requests -start server 
// start your app with this command: PORT=3000 node app.js
app.listen(process.env.PORT, process.env.IP, () =>{
    console.log("Yelp Camp Server has started")
});