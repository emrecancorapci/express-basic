import Express from 'express';
import {
  getAllUsers,
  getUser,
  // createUser,
  updateUser,
  deleteUser,
} from '../controllers/usersController.js';

const router = Express.Router();

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
