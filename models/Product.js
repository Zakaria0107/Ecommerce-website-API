const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name : {
        type : String 
    }, 
    category : {
        type : String
    },
    new : {
        type: Boolean , 
        default : true
    },
    price : {
        type : Number
    },
    description: {
        type : String 
    } , 
    features : {
        type: String
    } , 
    includes : {
        type : [Object]
    } ,
    photos : {
        type: [Object]
    }

}, {timestamps: true})

module.exports = mongoose.model('Product' , productSchema)