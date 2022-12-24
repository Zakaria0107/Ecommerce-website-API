const express = require("express")
const router = express.Router()
const {addOrder , deleteOrder , getAllOrders} = require("./../controllers/orderController")
const {ContactValidation} = require('./../middleware/FormValidation')
const {requireSignIn , isAuth} = require('./../middleware/isAuth')
const {userById} = require("./../controllers/userController")

router.post('/' , ContactValidation , addOrder)
router.get('/:Uid' ,requireSignIn,isAuth , getAllOrders)
router.delete('/:Uid/:orderId' ,requireSignIn,isAuth , deleteOrder)

router.param('Uid', userById)
module.exports = router