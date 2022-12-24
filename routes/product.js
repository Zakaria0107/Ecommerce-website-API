const express = require('express')
const router = express.Router()
const { storageFiles ,getAllProduct , getOneProduct , addProduct , updatProduct , deleteProduct} = require("./../controllers/productController")
const {requireSignIn , isAuth} = require('./../middleware/isAuth')
const {userById} = require("./../controllers/userController")

router.get('/' , getAllProduct)
router.get('/:productId' , getOneProduct)
router.post('/:Uid' ,requireSignIn,isAuth ,  storageFiles , addProduct )
router.put('/:Uid/:productId' ,requireSignIn,isAuth, storageFiles , updatProduct)
router.delete('/:Uid/:productId' ,requireSignIn,isAuth, deleteProduct)


router.param('Uid', userById)
module.exports = router