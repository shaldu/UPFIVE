const router = require('express').Router();
import { sendFriendRequest, getAllFriends, acceptFriendRequest, rejectFriendRequest, deleteFriend } from '../controllers/friend';
import authUser from '../middleware/user';

// router.get('/', authenticateToken, getUsers);
router.post('/request', authUser, sendFriendRequest);
router.post('/accept', authUser, acceptFriendRequest);
router.post('/reject', authUser, rejectFriendRequest);
router.post('/remove', authUser, deleteFriend);
router.get('/:profileId', authUser, getAllFriends);

export default router;