import bcrypt from 'bcrypt';
import { Schema, isValidObjectId, model } from 'mongoose';
import config from '../../../config';
import { IUser, UserModel } from './user.interface';

export const UserSchema = new Schema<IUser, UserModel>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    wishList: [
      {
        bookId: {
          type: Schema.Types.ObjectId,
          ref: 'Book',
          required: true,
        },
      },
    ],
    readingList: [
      {
        bookId: {
          type: Schema.Types.ObjectId,
          ref: 'Book',
          required: true,
        },
        status: {
          type: String,
          enum: ['Read Soon', 'Currently Reading', 'Finished Reading'],
          default: 'Read Soon',
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  },
);

UserSchema.statics.isUserExist = async function (
  payload: string,
): Promise<(Partial<IUser> & { id: string }) | null> {
  const findKey = isValidObjectId(payload)
    ? { _id: payload }
    : { email: payload };

  return await User.findOne(findKey, { id: 1, role: 1, password: 1 });
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  currentPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, currentPassword);
};

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  //hash password
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
export const User = model<IUser, UserModel>('User', UserSchema);
