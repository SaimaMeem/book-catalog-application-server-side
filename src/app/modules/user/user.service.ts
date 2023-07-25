// import bcrypt from 'bcrypt';
// import httpStatus from 'http-status';
// import config from '../../../config';
// import APIError from '../../../errors/APIError';

import { JwtPayload } from 'jsonwebtoken';
import { IUser } from './user.interface';
import { User } from './user.model';

const addToWishList = async (
  id: string,
  // person: JwtPayload | null,
  payload: string,
): Promise<IUser | null> => {
  // const book = await Book.findById(id, { seller: 1, _id: 0 });
  // if (book?.seller.toString() === person?.id) {

  const result = await User.findOneAndUpdate(
    { _id: id },
    { $push: { wishList: { id, payload } } },
    { new: true },
  );
  return result;
  // } else {
  //   throw new APIError(httpStatus.FORBIDDEN, 'Forbidden');
  // }
};

const getMyProfile = async (
  person: JwtPayload | null,
): Promise<IUser | null> => {
  const result = await User.findById(person?.id);
  return result;
};

export const UserService = {
  addToWishList,
  getMyProfile,
};
