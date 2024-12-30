import express from 'express';
import { test, updateUser } from '../Controllers/user.controller.js';
import { verfityToken } from '../utils/verify.User.js';
import { deleteUser } from '../Controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/test', test);
userRouter.post('/update/:id', verfityToken, updateUser)
userRouter.delete('/delete/:id', verfityToken, deleteUser)

export default userRouter;