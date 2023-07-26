import { JwtPayload } from 'jsonwebtoken';
import { IUser } from './user.interface';
import { User } from './user.model';

const addToWishList = async (
  person: JwtPayload | null,
  payload: object,
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate(
    { _id: person?.id },
    { $addToSet: { wishList: payload } },
    { new: true },
  );
  return result;
};

const addToReadingList = async (
  person: JwtPayload | null,
  payload: object,
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate(
    { _id: person?.id },
    { $addToSet: { readingList: payload } },
    { new: true },
  );
  return result;
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
  addToReadingList,
};
