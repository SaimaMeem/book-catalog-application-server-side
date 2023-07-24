import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import APIError from '../../../errors/APIError';
import { jwtHelper } from '../../../helpers/jwtHelper';
import {
  ILoginRequest,
  ILoginResponse,
  IRefreshTokenResponse,
} from '../../../interfaces/common';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const signUp = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  return result;
};

const loginUser = async (payload: ILoginRequest): Promise<ILoginResponse> => {
  const { email: enteredEmail, password: enteredPassword } = payload;

  const isUserExist = await User.isUserExist(enteredEmail);

  if (!isUserExist) {
    throw new APIError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const { id: userId, password: userPassword } = isUserExist;
  if (
    userPassword &&
    !(await User.isPasswordMatched(enteredPassword, userPassword))
  ) {
    throw new APIError(httpStatus.UNAUTHORIZED, 'Password does not match.');
  }

  //create access token & refresh token
  const accessToken = jwtHelper.createToken(
    {
      id: userId,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelper.createToken(
    {
      id: userId,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token

  let verifiedToken = null;
  try {
    verifiedToken = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (err) {
    throw new APIError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { id } = verifiedToken;

  //check if the refresh token is from a valid user
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new APIError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const { id: userId } = isUserExist;
  //generate new token
  const newAccessToken = jwtHelper.createToken(
    {
      userId,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  signUp,
  loginUser,
  refreshToken,
};
