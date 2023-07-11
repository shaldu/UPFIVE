const router = require('express').Router();
import { sendFriendRequest } from '../controllers/friend';
import authUser from '../middleware/user';

// router.get('/', authenticateToken, getUsers);
router.post('/request', authUser, sendFriendRequest);

export default router;