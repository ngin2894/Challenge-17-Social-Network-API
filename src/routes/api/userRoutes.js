import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, deleteFriend } from '../../controllers/userController.js';

const userRouter = Router();

userRouter.route('/')
    .get(getAllUsers)
    .post(createUser);

userRouter.route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

userRouter.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

export default userRouter;