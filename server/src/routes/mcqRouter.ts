import express from 'express';
import { getMCQs, submitMCQAnswers ,  addMCQ } from '../controllers/mcqController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, getMCQs);
router.post('/submit', authMiddleware, submitMCQAnswers);
router.post('/', addMCQ);

export default router;
