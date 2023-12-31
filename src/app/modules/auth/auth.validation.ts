import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: 'User Name is required',
    }),
    email: z
      .string({
        required_error: 'Email Address is required',
      })
      .email(),
    password: z.string({
      required_error: 'Password is required',
    }),
    confirmPassword: z.string({
      required_error: 'Confirm Password is required',
    }),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email Address is required',
      })
      .email(),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

export const AuthValidation = {
  createUserZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
};
