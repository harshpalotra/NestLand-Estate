import express, { Router } from 'express';
import { createListing } from '../Controllers/listing.controller.js';
import { verfityToken } from '../utils/verify.User.js';
const listingRouter = express.Router();

listingRouter.post('/create', verfityToken , createListing);

export default listingRouter;