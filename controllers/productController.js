const Product = require("./../models/Product")
const multer  = require('multer')
const mime = require('mime-types')
const fs = require('file-system')

const storageFiles = multer.diskStorage({
    destination : (req , res , cb) => {
        cb(null , 'UPLOADS/')
    } ,
    filename : (req , file , cb ) => {
        cb(null , file.fieldname+"-"+Date.now()+ Math.round(Math.random() * 1E9)+".jpg")
    }
})

exports.storageFiles = multer({storage:storageFiles}).array('photos', 12)

// get all products 
exports.getAllProduct = (req , res ) => {
    let query = Product.find({})
    query.exec((err , data) => {
        if(err) return res.status(400).json({error : err})
        res.json(data)
    })
}

//get one product 
exports.getOneProduct = (req , res) => {
    let query = Product.findOne({_id: req.params.productId})
    query.exec((err , data) => {
        if(err) return res.status(400).json({error : err})
        res.json(data)
    })
}

//add a product 
exports.addProduct = (req , res ) => {
    if(!req.files){
        return res.status(400).json({error: "selectionner une image"})
    }
    req.files.forEach( elt => {
        if(!elt || elt.mimetype.substr(0, 6) != "image/")
            return res.status(400).json({error: "selectionner une image"})
    });
    
    const product = new Product({
        ...req.body,
        photos : req.files
    })

    product.save((err, data) => {
        if(err) {
            return res.status(400).json({error: err})
        }

        res.send(data)
    })
}

// update a product 
exports.updatProduct = (req , res ) => {
    console.log(req.files)
    if(!req.files){
        return res.status(400).json({error: "selectionner une image"})
    }
    req.files.forEach( elt => {
        if(!elt || elt.mimetype.substr(0, 6) != "image/")
            return res.status(400).json({error: "selectionner une image"})
    });
    
    Product.findById(req.params.productId)
    .then(doc => {
        if(doc.photos){
            doc.photos.forEach(elt => {
                fs.unlink(elt.destination + elt.filename , function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                  });
            })
        }
    })
    .catch(err => {
        console.log(err);
    });

    let updatedObject = { ...req.body, photos: req.files }
    let Query = Product.updateOne({_id: req.params.productId}, updatedObject)

    Query.exec((err, data) => {
        if(err)
            return res.status(400).json({error: err})

        res.json(data)
    })
}

//delete product 
exports.deleteProduct = (req , res) => {
    Product.findById(req.params.productId)
    .then(doc => {
        if(doc.photos){
            doc.photos.forEach(elt => {
                fs.unlink(elt.destination + elt.filename , function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                  });
            })
        }
    })
    .catch(err => {
        console.log(err);
    });
    let query = Product.deleteOne({_id : req.params.productId})
    query.exec((err , data)=> {
        if(err)
            return res.status(400).json({error : err})
        res.json(data)
    })
}