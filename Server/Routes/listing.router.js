import express, { Router } from 'express';
import { createListing, updateListing, deleteListing, getListing, getListings } from '../Controllers/listing.controller.js';
import { verfityToken } from '../utils/verify.User.js';

const listingRouter = express.Router();

listingRouter.post('/create', verfityToken , createListing);
listingRouter.delete('/delete/:id', verfityToken, deleteListing)
listingRouter.post('/update/:id', verfityToken, updateListing)
listingRouter.get('/get/:id',  getListing)
listingRouter.get('/get', getListings)

export default listingRouter;