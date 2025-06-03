import express from 'express';
import auth from '../middleware/authMiddleware.js';
import { matchConsultants } from '../controllers/matchController.js';

const router = express.Router();
router.post('/', auth('client'), matchConsultants);
export default router;
