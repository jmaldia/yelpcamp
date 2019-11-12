let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

let app = express();

// connect to mongo db
mongoose.connect("mongodb://localhost/demo");

// sample schema
let catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

let Cat = mongoose.model("Cat", catSchema);

// sample mongoose code
// let george = new Cat({
//     name: "George",
//     age: 11,
//     temperament: "Grouchy"
// });

// Add to DB
// george.save((err, cat) => {
//     if (err) {
//         console.log("SOMETHING WENT WRONG!");
//     } else {
//         console.log("WE JUST SAVED A CAT TO THE DB!");
//         console.log(cat)
//     }
// });

Cat.find({}, (err, cats) => {
    if (err) {
        console.log("OH NO, ERROR!");
    } else {
        console.log(cats);
    }
});

// Cat.create({
//     name: "Snow White", 
//     age: 15, 
//     temperament: "Bland"
// }, (err, cat) => {
//     if (err) {
//         console.log("SOMETHING WENT WRONG!");
//     } else {
//         console.log("WE JUST SAVED A CAT TO THE DB!");
//         console.log(cat);
//     }
// });

let campgrounds = [
    { name: "Salmon Creek", image: "https://d2s0f1q6r2lxto.cloudfront.net/pub/ProTips/wp-content/uploads/2017/04/how-to-set-up-a-campsite.jpg" },
    { name: "Ganite Hill", image: "https://d2s0f1q6r2lxto.cloudfront.net/pub/ProTips/wp-content/uploads/2015/09/camp-checklist.jpg" }, 
    { name: "Mountain Goat's Rest", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxpL78CTsOJLLaVOdA3Ftktb_iQ-0CSHHmn4omFZx1RZ3yd1so&s" },
    { name: "Salmon Creek", image: "https://d2s0f1q6r2lxto.cloudfront.net/pub/ProTips/wp-content/uploads/2017/04/how-to-set-up-a-campsite.jpg" },
    { name: "Ganite Hill", image: "https://d2s0f1q6r2lxto.cloudfront.net/pub/ProTips/wp-content/uploads/2015/09/camp-checklist.jpg" }, 
    { name: "Mountain Goat's Rest", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxpL78CTsOJLLaVOdA3Ftktb_iQ-0CSHHmn4omFZx1RZ3yd1so&s" }
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