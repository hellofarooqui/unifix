
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage location and filename strategy
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Set the destination folder for uploaded images
    const uploadDir = path.join(__dirname, '../uploads/devices');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    // Create a unique filename: timestamp-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, `device-${uniqueSuffix}${extension}`);
  }
});

// File filter to only allow image uploads
const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Create the multer upload instance
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB file size limit
  }
});

// Middleware function to handle device image upload
export const deviceImageUpload = (req, res, next) => {

    console.log("Middleware deviceImageUpload called");
  // Use multer's single file upload functionality
  const uploadSingle = upload.single('deviceImage');
  
  uploadSingle(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`
      });
    } else if (err) {
      // An unknown error occurred
      return res.status(500).json({
        success: false,
        message: `Server error: ${err.message}`
      });
    }
    
    // If no file was uploaded, continue without setting the image path
    if (!req.file) {
        console.log("There is no file");
      return next();
    }
    
    // Add the file path to the request body
    req.body.image = `/uploads/devices/${req.file.filename}`;

    console.log("Req body in Middleware", req.body);
    
    // Continue to the next middleware or route handler
    next();
  });
};
