import express from 'express';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = express.Router();

router.patch('/:id', UserController.updateReadingListBookStatus);
router.post('/add-to-wish-list', auth(), UserController.addToWishList);
router.post('/add-to-reading-list', auth(), UserController.addToReadingList);

router.get('/my-profile', auth(), UserController.getMyProfile);

export const UserRoutes = router;
