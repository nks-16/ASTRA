import express from 'express';
import { login, signup } from '../controllers/authController';

const router = express.Router();

// POST /signup - Route to handle user signup
router.post('/signup', signup);

// POST /login - Route to handle user login
router.post('/login', login);

export default router;
