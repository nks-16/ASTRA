import express from 'express';
import { createTeam, joinTeam } from '../controllers/teamController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createTeam);
router.post('/join/:teamId', authMiddleware, joinTeam);

export default router;
