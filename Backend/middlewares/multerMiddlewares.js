const multer = require("multer");
const {v4: uuidv4} = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      // const uniqueFilename = `${v4()}-${file.originalname}`;
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
  const allowedFileType = ['image/jpeg', 'image/jpg', 'image/png']
  if(allowedFileType.includes(file.mimetype)){
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const fileFilterCV = (req, file, cb) => {
  if (file.fieldname === "experience") { // if uploading resume
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) { // check file type to be pdf, doc, or docx
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  } else { // else uploading image
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) { // check file type to be png, jpeg, or jpg
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  }
};

const fileSingleFile = (req, file, cb) => {
  if (file.fieldname === "experience") { // if uploading resume
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) { // check file type to be pdf, doc, or docx
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  }
};

const upload = multer({ storage, fileFilter })

const uploadCV = multer({storage, fileFilterCV})

const uploadFile = multer({storage, fileSingleFile})

module.exports = {
  upload,
  uploadCV,
  uploadFile
};
