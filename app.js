let express = require("express");
let bodyParser = require("body-parser");

let app = express();

let campgrounds = [
    { name: "Salmon Creek", image: "https://www.nps.gov/shen/planyourvisit/images/20170712_A7A9022_nl_Campsites_BMCG_960.jpg?maxwidth=1200&maxheight=1200&autorotate=false" },
    { name: "Ganite Hill", image: "https://www.nps.gov/mora/planyourvisit/images/OhanaCampground2016_CMeleedy_01_web.jpeg?maxwidth=1200&maxheight=1200&autorotate=false" }, 
    { name: "Mountain Goat's Rest", image:"https://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg" }
]

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