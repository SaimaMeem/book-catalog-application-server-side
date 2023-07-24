// import { z } from 'zod';
// import { Role } from './user.constant';

// type IReadOnlyFields = {
//   Income: number | undefined;
//   Budget: number | undefined;
//   Role: string | undefined;
// };

// const updateUserZodSchema = z.object({
//   body: z.object({
//     password: z.string().optional(),
//     name: z
//       .object({
//         firstName: z.string().optional(),
//         lastName: z.string().optional(),
//       })
//       .optional(),
//     role: z.enum([...Role] as [string, ...string[]]).optional(),
//     phoneNumber: z.string().optional(),
//     address: z.string().optional(),
//     budget: z.number().optional(),
//     income: z.number().optional(),
//   }),
// });

// const updateMyProfileZodSchema = updateUserZodSchema.refine(data => {
//   const { income, budget, role, ...rest } = data.body;
//   const invalidFields = [];
//   const readOnlyFields: IReadOnlyFields[] = [
//     { Income: income, Budget: budget, Role: role },
//   ];
//   for (const obj of readOnlyFields) {
//     for (const key in obj) {
//       if (obj[key as keyof IReadOnlyFields] !== undefined) {
//         invalidFields.push(key);
//       }
//     }
//   }

//   if (invalidFields.length > 0) {
//     throw new Error(`${invalidFields.join(', ')} cannot be updated.`);
//   }
//   return {
//     body: rest,
//   };
// });
// export const UserValidation = {
//   updateUserZodSchema,
//   updateMyProfileZodSchema,
// };
