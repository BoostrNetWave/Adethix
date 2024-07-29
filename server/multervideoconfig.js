const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer for storing uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// File filter function
// const checkFileType = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png/;
//     const mimetype = allowedTypes.test(file.mimetype);
//     const extname = allowedTypes.test(file.originalname.split('.').pop());

//     if (mimetype && extname) {
//         return cb(null, true);
//     }
//     cb(new Error('File type not allowed'), false);
// };

const uploadVideo = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10MB
});

module.exports = uploadVideo;