const express = require('express')
const router = express.Router()
const { storageFiles , addBanner , getAllBanners , updateBanner , deleteBanner} = require("./../controllers/bannerController")
const {requireSignIn , isAuth} = require('./../middleware/isAuth')
const {userById} = require("./../controllers/userController")


router.get('/' , getAllBanners)
router.post('/:Uid' ,requireSignIn,isAuth , storageFiles , addBanner )
router.put('/:Uid/:productId' ,requireSignIn,isAuth , storageFiles , updateBanner)
router.delete('/:Uid/:productId',requireSignIn,isAuth  , deleteBanner)

router.param('Uid', userById)
module.exports = router