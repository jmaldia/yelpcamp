let mongoose                = require("mongoose");
let passportLocalMongoose   = require('passport-local-mongoose'); // simplifies building username and password login with Passport

// SCHEMA SETUP
let UserSchema = new mongoose.Schema({
    name: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports =  mongoose.model("User", UserSchema);