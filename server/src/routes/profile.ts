const router = require('express').Router();
import { getProfile } from '../controllers/profile';
import authenticateToken from '../middleware/auth';
import authUser from '../middleware/user';

// router.get('/', authenticateToken, getUsers);
router.get('/:id', authUser, getProfile);

export default router;