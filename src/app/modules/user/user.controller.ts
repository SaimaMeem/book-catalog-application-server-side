import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const addToWishList = catchAsync(async (req: Request, res: Response) => {
  const { id, title } = req.body;
  // const person = req.person;
  const result = await UserService.addToWishList(id, title);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book added to wishlist successfully',
    data: result,
  });
});
const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const person = req.person;
  const result = await UserService.getMyProfile(person);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrieved successfully",
    data: result,
  });
});

export const UserController = {
  addToWishList,
  getMyProfile,
};
