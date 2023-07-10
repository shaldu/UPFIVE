const router = require('express').Router();
import { getUser, getUsers, createUser, updateUser, deleteUser, loginUser } from '../controllers/user';
import authenticateToken from '../middleware/auth';
import authUser from '../middleware/user';

// router.get('/', authenticateToken, getUsers);
router.get('/:id', authUser, getUser);
router.post('/create', authenticateToken, createUser);
router.post('/login', authenticateToken, loginUser);
router.put('/:id', authUser, updateUser);
router.delete('/:id', authUser, deleteUser);

export default router;