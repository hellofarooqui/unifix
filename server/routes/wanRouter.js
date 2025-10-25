import express from 'express';
import { getWanStatus, updateWanSettings } from '../controllers/wanController.js';
import {
  getAllWanConnections,
  getWanById,
  createWanConnection,
  updateWanConnection,
  deleteWanConnection,
} from "../controllers/wanController.js";
import verifyUser from '../middleware/verifyUser.js';
const router = express.Router();

// Route to get WAN status
router.get('/status', verifyUser, getWanStatus);
// Route to update WAN settings
router.put("/settings", verifyUser, updateWanSettings);

router.get('/', getAllWanConnections); // Assuming you have a function to get all WAN connections
router.get('/:wanId', getWanById); // Assuming you have a function to get a WAN connection by ID
router.post("/new", verifyUser, createWanConnection); // Assuming you have a function to create a new WAN connection
router.put("/update/:wanId", verifyUser, updateWanConnection); // Assuming you have a function to update a WAN connection
router.delete("/delete/:wanId", verifyUser, deleteWanConnection); // Assuming you have a function to delete a WAN connection

export default router;
