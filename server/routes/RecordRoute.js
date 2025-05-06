import express from 'express';
import { addRecord, deleteRecord, getRecords, updateRecord } from '../controllers/RecordControllers.js';

const router = express.Router();

// router.post('death', addDeath)
// const addDeath = async (req, res) => {
// }
//
// router.get('death', getDeaths)
// const getDeaths = async (req, res) => {
// }

router.post('record', addRecord);
router.get('record', getRecords);
router.put('record', updateRecord);
router.delete('record', deleteRecord);

export default router;
