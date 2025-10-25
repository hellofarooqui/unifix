import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {
  userLogin,
  userProfile,
  getUsersList,userRegister,
  userDetails,
} from "../controllers/authoController.js";
import verifyUser from '../middleware/verifyUser.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Register
router.post('/register', userRegister);

// Login
router.post('/login', userLogin);

// Get Authenticated User
router.get('/me', userProfile);
router.get("/all", getUsersList);

router.get("/user" , verifyUser , userDetails)

export default router;
