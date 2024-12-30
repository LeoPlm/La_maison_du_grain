
const fs = require('fs')

const multer = require('multer')

const path = require('path')

const uploadFolder = path.join(__dirname, '../uploads')

if(!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder)
    console.log('dossier "upload" crée')
}

const storage = multer.diskStorage({
    destination: (req,file, cb) =>{
        cb(null, uploadFolder)
    },
    filename: (req,file, cb) =>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

module.exports = upload 