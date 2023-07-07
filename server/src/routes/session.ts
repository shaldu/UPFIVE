const router = require('express').Router();

import { createSession } from '../controllers/session';
import authenticateToken from '../middleware/auth';

// router.post('/', authenticateToken, createSession);

export default router;