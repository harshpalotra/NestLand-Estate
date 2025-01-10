import express, { Router } from 'express';
import { createListing } from '../Controllers/listing.controller.js';
import { verfityToken } from '../utils/verify.User.js';
import { deleteListing } from '../Controllers/user.controller.js';
const listingRouter = express.Router();

listingRouter.post('/create', verfityToken , createListing);
listingRouter.delete('/delete/:id', verfityToken, deleteListing)

export default listingRouter;