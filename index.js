const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const expressValidator = require('express-validator')

// routers
const productRouter = require('./routes/product')
const orderRouter = require('./routes/order')
const bannerRouter = require('./routes/banner')
const userRouter = require('./routes/user')


const app = express()
app.use(cors())
app.use(expressValidator())
require('dotenv').config()
// connection to database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('connected to database'))
.catch((err) => console.log('database is not connected : ' + err))

// test app
app.get('/', (req, res) => {
    res.send("welcome to womiprod server")
})

// middllwares
app.use('/public', express.static('./public'));
app.use(express.json())
//app.use(expressValidator())

app.use('/UPLOADS', express.static('./UPLOADS'));
// routes middllwares
app.use('/api/product', productRouter)
app.use('/api/order', orderRouter)
app.use('/api/banner', bannerRouter)
app.use('/api/user', userRouter)
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`app is now listening at port ${port}`))

module.exports = app;