let mongoose                = require("mongoose");
let passportLocalMongoose   = require('passport-local-mongoose'); // simplifies building username and password login with Passport

// SCHEMA SETUP
let userSchema = new mongoose.Schema({
    name: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

module.exports =  mongoose.model("User", userSchema);