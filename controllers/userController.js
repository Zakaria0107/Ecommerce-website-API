const User = require('./../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
exports.signup = async (req, res) => {
    try {
        if(req.body.confirmPass !== req.body.password || !req.body.confirmPass) {
            return res.status('400').json({error: "passwords not match"})
        }
        // Hashing passwords
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        const user = new User({email : req.body.email , password : hashed})

        user.save((err, user) => {
            if(err) {
                return res.status('400').json({error: err})
            }

            res.send(user)
        })
    }
    catch(error) {

    }
}

exports.signin = (req, res) => {
    try {
        const {email, password} = req.body

        User.findOne({email}, async (err, user) => {
            if(err || !user) {
                return res.status(400).json({error: "Wrong email or password"})
            }
            const isValid = await bcrypt.compare(password, user.password);
            if(!isValid) {
                return res.status(401).json({error: "Wrong email or password"})
            }

            //expire after 1 hours exp: Math.floor(Date.now() / 1000) + (60 * 60)
            const token = jwt.sign({_id: user._id, exp: Math.floor(Date.now() / 1000) + (240 * 60)}, process.env.JWT_SECRET, { algorithm: 'HS256' }); 

            const {_id, email} = user;

            return res.json({_id, email , token})
        })
    }
    catch(error) {

    }
}


exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(404).json({
                error: "no user"
            })
        }

        req.profile = user;
        next();
    })
}

exports.getOneUser = (req, res) => {
    res.json({
        user: req.profile._id
    })
}

// exports.SignOut = (req, res) =>  {
//     res.clearCookie('token');

//     res.json({
//         message: superAdminErrors.superAdminError.disconnected
//     })
// }
