import multer from "multer";
import fs from "fs";

const uploadDir = "./uploads/ciscoAssets/";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

console.log("Upload Middlware called")

const uploadCiscoAssets = multer({ storage: storage });

export default uploadCiscoAssets;
