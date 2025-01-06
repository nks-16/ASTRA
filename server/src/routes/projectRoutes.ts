import express from 'express';
import { createProject, getUserProjects } from '../controllers/projectController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create', authenticate , createProject); // Requires authentication
router.get('/user-projects', authenticate , getUserProjects); // Requires authentication

export default router;
