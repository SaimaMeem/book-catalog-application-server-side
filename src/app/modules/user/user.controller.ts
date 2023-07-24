import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const addToWishList = catchAsync(async (req: Request, res: Response) => {
  console.log('============', req.body);

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
export const UserController = {
  addToWishList,
};
