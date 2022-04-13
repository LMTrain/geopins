const mongoose = require('mongose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    picture: String
})

module.exports=mongoose.model("User", UserSchema)
