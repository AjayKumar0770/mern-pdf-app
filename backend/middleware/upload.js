const multer = require('multer');

const storage = multer.memoryStorage(); // Store files in memory (for PDF processing)
const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('application/pdf')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files allowed'), false);
    }
  }
});

module.exports = upload;
