import { Model, Types } from 'mongoose';
export type WishList = {
  bookId: Types.ObjectId;
};
export type ReadingList = {
  bookId: Types.ObjectId;
  status: 'Read Soon' | 'Currently Reading' | 'Finished Reading';
};
export type IUser = {
  username: string;
  email: string;
  password: string;
  wishList: WishList[];
  readingList: ReadingList[];
};

export type UserModel = {
  isUserExist(payload: string): Promise<Partial<IUser> & { id: string }>;
  isPasswordMatched(
    givenPassword: string,
    currentPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;

// export type UserModel = Model<IUser, Record<string, unknown>>;
