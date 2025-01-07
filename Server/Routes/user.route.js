import express from 'express';
import { getUserListing, test, updateUser } from '../Controllers/user.controller.js';
import { verfityToken } from '../utils/verify.User.js';
import { deleteUser } from '../Controllers/user.controller.js';
import { signOut } from '../Controllers/user.controller.js';
const userRouter = express.Router();

userRouter.get('/test', test);
userRouter.post('/update/:id', verfityToken, updateUser)
userRouter.delete('/delete/:id', verfityToken, deleteUser)
userRouter.get('/listing/:id', verfityToken, getUserListing)
userRouter.get('/signout', signOut)

export default userRouter;

