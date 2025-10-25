import express from 'express';
import {deviceImageUpload} from '../middleware/uploadImage.js';
import {
  getAllDevices,
  getDeviceById,
  createDevice,
  importDevices,
  updateDevice,
  deleteDevice,
  searchDevices,
  getDeviceCount,
} from "../controllers/devicesController.js";
import { addDeviceType, getAllDeviceTypes, updateDeviceType, deleteDeviceType, getDeviceTypeById } from '../controllers/deviceTypeController.js';
import formatData from '../middleware/formatData.js';

const router = express.Router();


router.post('/type/new', addDeviceType);
router.get('/type', getAllDeviceTypes);
router.put('/type/:deviceTypeId', updateDeviceType);
router.delete('/type/:deviceTypeId', deleteDeviceType);
router.get('/type/:deviceTypeId', getDeviceTypeById);

router.get("/search", searchDevices);
router.get('/', getAllDevices);
router.get("/count", getDeviceCount);
router.get('/:deviceId', getDeviceById);
router.post('/new', deviceImageUpload ,createDevice);
router.post('/new/import', importDevices )
router.put('/update/:deviceId',deviceImageUpload, updateDevice);
router.delete('/delete/:deviceId', deleteDevice);




export default router;