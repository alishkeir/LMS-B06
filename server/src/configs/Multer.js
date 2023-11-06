const multer = require('multer');
const path = require('path');
const Validator = require('../middlewares/Validation');

const fs = require('fs');

if (!fs.existsSync('uploads/')) {
  fs.mkdirSync('uploads/');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1e10 }, // Specify the file size limit (in this case, 1 GB)

  fileFilter: function (req, file, cb) {
    if (req.path.includes('students')) {
      const validationResults =
        req.method === 'POST'
          ? Validator.validateCreateStudent(req)
          : Validator.validateUpdateStudent(req);

      if (validationResults.error) {
        // Return a JSON response with the validation error message
        return cb('Validation error: ' + validationResults.message, false);
      }
    }

    // Specify the file types that are allowed to be uploaded
    if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      // Reject the file if it's not a JPEG or PNG
      cb(new Error('Only JPEG and PNG files are allowed!'), false);
    }
  },
});

module.exports = upload;
