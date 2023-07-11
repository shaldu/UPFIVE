const router = require('express').Router();
import { sendFriendRequest, getAllFriends } from '../controllers/friend';
import authUser from '../middleware/user';

// router.get('/', authenticateToken, getUsers);
router.post('/request', authUser, sendFriendRequest);
router.get('/:profileId', authUser, getAllFriends);

export default router;