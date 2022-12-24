const mongoose = require("mongoose")

const bannerSchema = new mongoose.Schema({
    trenndingProduct : {
        type : mongoose.ObjectId 
    },
    photos :{
        type : [Object]
    }
})

module.exports = mongoose.model("Banner" , bannerSchema)