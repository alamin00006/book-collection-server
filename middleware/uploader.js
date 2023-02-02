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
        // const supportedImage = /pdf/;
        const supportedImage = /png|jpg|pdf|PNG|JPG|jpeg|JPEG/;
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

const productFile = uploader.fields([{ name: 'image', maxCount:1}, { name: 'pdf', maxCount:1}])

module.exports = productFile;





// const multer = require('multer');

// const path = require('path');

// const storage = multer.diskStorage({
//     destination: 'images/',
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, uniqueSuffix + '-' + file.originalname)
//     }
//   })

// const uploader = multer({
//     storage,
//     fileFilter:(req, file, cb)=>{
//         // const supportedImage = /pdf/;
//         const supportedImage = /png|jpg|pdf/;
//         const extension = path.extname(file.originalname);
//         if(supportedImage.test(extension)){
//             cb(null, true)
//         }else{
//             cb(new Error('must be png / jpg image'))
//         }
//     },
//     limits:{
//         fileSize:5000000
//     }
// })
// module.exports = uploader;

// const fs= require('fs');
// const path=require('path');
// const dirPath= path.join(__dirname,'files');
// console.log(dirPath)
// // for(i=0;i<5;i++)
// // {
// //     fs.writeFileSync(`${dirPath}/hello${i}.txt`,"some simple text in file")

// // }
// fs.readdir(dirPath,(err,files)=>{
//     files.forEach((item)=>{
//         console.warn("file name is : ",item)
//     });
// }
// )