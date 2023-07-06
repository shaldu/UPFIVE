const router = require('express').Router();
import { getUser, getUsers, createUser, updateUser, deleteUser } from '../controllers/user';
import authenticateToken from '../middleware/auth';
import authUser from '../middleware/user';

router.get('/', authenticateToken, getUsers);
router.get('/:id', authUser, getUser);
router.post('/', authenticateToken, createUser);
router.put('/:id', authUser, updateUser);
router.delete('/:id', authUser, deleteUser);

export default router;