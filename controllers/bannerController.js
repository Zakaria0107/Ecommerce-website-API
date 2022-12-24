const Banner = require("./../models/Banner")
const multer  = require('multer')
const mime = require('mime-types')
const fs = require('file-system')

const storageFiles = multer.diskStorage({
    destination : (req , res , cb) => {
        cb(null , 'UPLOADS/')
    } ,
    filename : (req , file , cb ) => {
        cb(null , file.fieldname+"-"+Date.now()+".jpg")
    }
})

exports.storageFiles = multer({storage:storageFiles}).array('photos', 12)


exports.getAllBanners = (req , res ) => {
    let query = Banner.find({})
    query.exec((err , data) => {
        if(err) return res.status(400).json({error : err})
        res.json(data)
    })
}




exports.addBanner = (req , res ) => {
    if(!req.files){
        return res.status(400).json({error: "selectionner une image"})
    }
    req.files.forEach( elt => {
        if(!elt || elt.mimetype.substr(0, 6) != "image/")
            return res.status(400).json({error: "selectionner une image"})
    });
    
    const banner = new Banner({
        ...req.body,
        photos : req.files
    })

    banner.save((err, data) => {
        if(err) {
            return res.status(400).json({error: err})
        }

        res.send(data)
    })
}

exports.updateBanner = (req , res ) => {
    if(!req.files){
        return res.status(400).json({error: "selectionner une image"})
    }
    req.files.forEach( elt => {
        if(!elt || elt.mimetype.substr(0, 6) != "image/")
            return res.status(400).json({error: "selectionner une image"})
    });
    
    Banner.findById(req.params.bannerId)
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
    let Query = Banner.updateOne({_id: req.params.bannerId}, updatedObject)

    Query.exec((err, data) => {
        if(err)
            return res.status(400).json({error: err})

        res.json(data)
    })
}


exports.deleteBanner = (req , res) => {
    Product.findById(req.params.bannerId)
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
    let query = Banner.deleteOne({_id : req.params.bannerId})
    query.exec((err , data)=> {
        if(err)
            return res.status(400).json({error : err})
        res.json(data)
    })
}