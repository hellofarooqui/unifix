import express from 'express';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import dotenv from 'dotenv';

import authRouter from './routes/authRouter.js'
import rmaRouter from './routes/rmaRouter.js';
import devicesRouter from './routes/devicesRouter.js';
import supportTicketRouter from './routes/supportTicketRouter.js';
import wanRouter from './routes/wanRouter.js';
import vendorRouter from './routes/vendorRouter.js';
import searchRouter from './routes/searchRouter.js';
import projectRouter from "./routes/projectRouter.js";

dotenv.config();

import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fix the static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from uploads directory
// Since your images are stored as "/uploads/devices/filename.jpg", 
// the uploads folder should be at the root level relative to your server
const uploadsPath = path.join(__dirname, 'uploads');
console.log('Serving static files from:', uploadsPath); // Debug log

app.use("/uploads", (req, res, next) => {
  console.log("Requested file:", req.url);
  console.log("Full path would be:", path.join(uploadsPath, req.url));
  next();
});


// This will serve files from the uploads directory at the /uploads route
// So /uploads/devices/image.jpg will be accessible as http://localhost:3000/uploads/devices/image.jpg
app.use('/uploads', express.static(uploadsPath));

// Connect to database
connectDB();

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/auth", authRouter)
app.use("/api/rma", rmaRouter);
app.use("/api/devices", devicesRouter);
app.use("/api/support", supportTicketRouter);
app.use('/api/wan', wanRouter)
app.use('/api/vendor', vendorRouter);
app.use('/api/search', searchRouter);
app.use('/api/projects', projectRouter)


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Add a test route to check if file serving works
app.get('/test-upload/:filename', (req, res) => {
    const filePath = path.join(uploadsPath, req.params.filename);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log('File not found:', filePath);
            res.status(404).send('File not found');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});