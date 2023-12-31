import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import APIError from '../../errors/APIError';
import { jwtHelper } from '../../helpers/jwtHelper';

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    //get authorization token
    const token = req.headers.authorization;
    if (!token) {
      throw new APIError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    //verify token
    let verifiedUser = null;

    verifiedUser = jwtHelper.verifyToken(token, config.jwt.secret as Secret);
    req.person = verifiedUser;
    // console.log(verifiedUser);

    //verify authorization
    // if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
    //   throw new APIError(httpStatus.FORBIDDEN, 'Forbidden');
    // }
    next();
  } catch (error) {
    next(error);
  }
};
export default auth;
