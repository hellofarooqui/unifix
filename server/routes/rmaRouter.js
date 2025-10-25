import express from 'express';
import { createRMATicket,getActiveRMAs, editRMATicket,deleteRMATicket, getAllRMATickets, getRMAbyNumber, updateRMAStatus } from '../controllers/rmaController.js';

const router = express.Router();

router.get('/',getAllRMATickets);
router.get('/active', getActiveRMAs)

router.get('/:rmanumber', getRMAbyNumber)

router.post('/new', createRMATicket);

router.put('/updateStatus/:rmanumber', updateRMAStatus )
router.put('/edit/:rmanumber', editRMATicket);

router.delete('/delete/:id', deleteRMATicket);


export default router;


