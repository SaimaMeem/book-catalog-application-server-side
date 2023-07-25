import express from 'express';
// import auth from '../../middlewares/auth';
// import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';
// import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/add-to-wishlist',
  // auth(ENUM_ROLE.BUYER, ENUM_ROLE.SELLER),
  UserController.addToWishList,
);

router.get('/my-profile', auth(), UserController.getMyProfile);
// router.get('/:id',
// auth(ENUM_ROLE.ADMIN),
//  UserController.getSingleUser);
// router.get('/', auth(ENUM_ROLE.ADMIN),
//  UserController.getAllUsers);

// router.patch(
//   '/my-profile',
//   validateRequest(UserValidation.updateMyProfileZodSchema),
//   auth(ENUM_ROLE.BUYER, ENUM_ROLE.SELLER),
//   UserController.updateMyProfile
// );
// router.patch(
//   '/:id',
//   validateRequest(UserValidation.updateUserZodSchema),
//   auth(ENUM_ROLE.ADMIN),
//   UserController.updateUser
// );

// router.delete('/:id', auth(ENUM_ROLE.ADMIN), UserController.deleteUser);

export const UserRoutes = router;
