import { JwtPayload } from 'jsonwebtoken';
import { IUser } from './user.interface';
import { User } from './user.model';

const addToWishList = async (
  person: JwtPayload | null,
  payload: object,
): Promise<IUser | null> => {
  console.log('====================', payload, person?.id);

  const result = await User.findOneAndUpdate(
    { _id: person?.id },
    { $push: { wishList: payload } },
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
};
