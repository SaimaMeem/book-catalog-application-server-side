import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const addToWishList = catchAsync(async (req: Request, res: Response) => {
  const { bookInfo } = req.body;
  const person = req.person;
  const result = await UserService.addToWishList(person, bookInfo);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book added to wishlist successfully',
    data: result,
  });
});

const addToReadingList = catchAsync(async (req: Request, res: Response) => {
  const { bookInfo } = req.body;
  const person = req.person;
  const result = await UserService.addToReadingList(person, bookInfo);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book added to reading list successfully',
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

const updateReadingListBookStatus = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const { bookInfo } = req.body;

    const result = await UserService.updateReadingListBookStatus(id, bookInfo);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User's reading list updated successfully",
      data: result,
    });
  },
);

export const UserController = {
  addToWishList,
  getMyProfile,
  addToReadingList,
  updateReadingListBookStatus,
};
