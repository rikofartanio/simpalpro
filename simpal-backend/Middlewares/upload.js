const multer = require('multer');
const path = require('path');

//config penyimpanan file
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/'); //lokasi simpan file
    },
    filename: function (req, file, cb){
        const uniqueName = Date.now()+ '-' + Math.round(Math.random()* 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueName + ext);
    }
});

//Filter file (.jpg, .jpeg, .png)
const fileFilter = (req, file, cb)=> {
    const allowedTypes = ['image/jpeg','image/png','image/jpg'];
    if (allowedTypes.includes(file.mimetype)){
        cb(null, true);
    }else {
        cb(new Error('Only .jpg, .jpeg, and .png files are allowed'),false);
    }
};

const upload = multer({ storage, fileFilter});

module.exports = upload;