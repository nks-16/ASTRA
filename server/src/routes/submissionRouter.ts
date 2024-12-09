import express from 'express';
import { submitSolution } from '../controllers/submissionController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, submitSolution);

export default router;
