const {contactErrors }= require("./../errors/order")

exports.ContactValidation = (req , res , next) => {
    req.check('name', contactErrors.emptyName).notEmpty()
    req.check('email', contactErrors.emptyEmail).notEmpty().isEmail().withMessage(contactErrors.notEmail)
    req.check('phoneNumber', contactErrors.emptyPhoneNumber).notEmpty()
    req.check('address', contactErrors.emptyAddress).notEmpty()
    req.check('city', contactErrors.emptyCity).notEmpty()
    req.check('zipCode', contactErrors.emptyZipcode).notEmpty()
    req.check('country', contactErrors.emptyCountry).notEmpty()
    
    const errors = req.validationErrors()

    if(errors) {
        return res.status(400).json({error: errors[0].msg})
    }
    next()
}