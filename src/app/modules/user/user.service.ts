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

const updateReadingListBookStatus = async (
  id: string,
  payload: { bookId: string; status: string },
) => {
  const result = await User.updateOne(
    {
      _id: id,
      'readingList.bookId': payload?.bookId,
    },
    { $set: { 'readingList.$.status': payload?.status } },
    { new: true },
  );
  return result;
};
export const UserService = {
  addToWishList,
  getMyProfile,
  addToReadingList,
  updateReadingListBookStatus,
};

// const result = await User.findOneAndUpdate(
//   {
//     _id: new ObjectId(id),
//     'readingList.bookId': new ObjectId(payload?.bookId),
//   },
//   { $set: { 'readingList.$[elem].status': payload?.status } },
//   { arrayFilters: [{ 'elem.bookId': payload?.bookId }], new: true },
// );
