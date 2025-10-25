import express from 'express';
import { getVendors, getVendorsList, addVendor, updateVendor, deleteVendor } from '../controllers/vendorController.js';


const router = express.Router()

router.get('/', getVendors);
router.get('/list',getVendorsList)
router.post('/new', addVendor);
router.put('/:id', updateVendor);
router.delete('/:id', deleteVendor);

export default router;