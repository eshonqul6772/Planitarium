const multer = require('multer');
const path = require('path');




const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})


const upload = multer({
    storage:storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        checkFileTYpe(file, cb)
    }
})

function checkFileTYpe(file, cb){
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
       return  cb(null, true);
    }else{
        cb(new Error('Please upload a valid image'), false);
    }
}

module.exports = upload

