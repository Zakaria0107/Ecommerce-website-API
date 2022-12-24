const express = require("express")
const router = express.Router()
const {signup , signin , getOneUser} = require("./../controllers/userController")
const {requireSignIn , isAuth} = require('./../middleware/isAuth')
const {userById} = require("./../controllers/userController")

router.post('/signup' , signup)
router.post('/signin' , signin)
router.get('/:Uid', requireSignIn, isAuth, getOneUser)
router.param('Uid', userById)

module.exports = router