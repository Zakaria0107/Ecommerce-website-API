const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email : {
        type: String 
    },
    password : {
        type: Object, 
    }

})

module.exports = mongoose.model("User" , userSchema)