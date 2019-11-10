let express = require("express");
let app = express();

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/campgrounds", (req, res) => {
    let campgrounds = [
        { name: "Salmon Creek", image: "https://www.nps.gov/shen/planyourvisit/images/20170712_A7A9022_nl_Campsites_BMCG_960.jpg?maxwidth=1200&maxheight=1200&autorotate=false" },
        { name: "Ganite Hill", image: "https://www.nps.gov/mora/planyourvisit/images/OhanaCampground2016_CMeleedy_01_web.jpeg?maxwidth=1200&maxheight=1200&autorotate=false" }, 
        { name: "Mountain Goat's Rest", image:"https://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg" }
    ]

    res.render("campgrounds", { campgrounds: campgrounds });
});

// Tell express to listen for requests -start server 
// start your app with this command: PORT=3000 node app.js
app.listen(process.env.PORT, process.env.IP, () =>{
    console.log("Yelp Camp Server has started")
});