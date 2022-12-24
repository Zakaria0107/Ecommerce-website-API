const Order = require("../models/Order")

exports.addOrder = (req , res ) => {
    let order = new Order(req.body)
    order.save((err , data) => {
        if(err) return res.status(400).json({error: err})
        res.send(data)
    })
}


exports.getAllOrders = (req , res) => {
    let query = Order.find({})
    query.exec((err , data)=> {
        if(err)
            return res.status(400).json({error : err})
        res.json(data)
    })
}



exports.deleteOrder = (req , res) => {
    let query = Order.deleteOne({_id : req.params.orderId})
    query.exec((err , data)=> {
        if(err)
            return res.status(400).json({error : err})
        res.json(data)
    })
}