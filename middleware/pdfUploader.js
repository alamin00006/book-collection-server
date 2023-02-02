const multer = require('multer');

const path = require('path');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })

const uploader = multer({
    storage,
    fileFilter:(req, file, cb)=>{
        const supportedImage = /pdf/;
        // const supportedImage = /png|jpg|pdf/;
        const extension = path.extname(file.originalname);
        if(supportedImage.test(extension)){
            cb(null, true)
        }else{
            cb(new Error('must be png / jpg / pdf image'))
        }
    },
    limits:{
        fileSize:5000000
    }
})

const pdfFile = uploader.fields([{name: 'pdf', maxCount:1}])

module.exports = pdfFile;