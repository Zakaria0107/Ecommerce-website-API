const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    name : {
        type : String 
    }, 
    email : {
        type : String
    },
    phoneNumber : {
        type : String 
    },
    address : {
        type : String
    },
    zipCode : {
        type : String
    },
    city : {
        type : String
    },
    country : {
        type : String
    },
    orders : {
        type : [Object]
    },

})

module.exports  = mongoose.model("Order" , orderSchema )