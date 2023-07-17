import { SortOrder } from 'mongoose';
import { PaginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { bookSearchableFields } from './book.constant';
import { IBook, IBookFilters } from './book.interface';
import { Book } from './book.model';

// const createBook = async (book: IBook): Promise<IBook | null> => {
//   const seller = await User.findOne(
//     { _id: book.seller, role: 'seller' },
//     { id: 1 },
//   );

//   if (seller) {
//     const result = await Book.create(book);
//     return result;
//   } else {
//     throw new APIError(httpStatus.BAD_REQUEST, 'Invalid Seller ID');
//   }
// };

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelper.calculatePagination(paginationOptions);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: new RegExp(`^${value}$`, 'i'),
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Book.find(whereConditions)
    // .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Book.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// const getSingleBook = async (id: string): Promise<IBook | null> => {
//   const result = await Book.findById(id).populate('seller');
//   return result;
// };

// const updateBook = async (
//   id: string,
//   person: JwtPayload | null,
//   payload: Partial<IBook>,
// ): Promise<IBook | null> => {
//   const book = await Book.findById(id, { seller: 1, _id: 0 });
//   if (book?.seller.toString() === person?.id) {
//     const result = await Book.findByIdAndUpdate(id, payload, {
//       new: true,
//     }).populate('seller');
//     return result;
//   } else {
//     throw new APIError(httpStatus.FORBIDDEN, 'Forbidden');
//   }
// };

// const deleteBook = async (
//   id: string,
//   person: JwtPayload | null,
// ): Promise<IBook | null> => {
//   const book = await Book.findById(id, { seller: 1, _id: 0 });

//   if (book?.seller.toString() === person?.id) {
//     const result = await Book.findByIdAndDelete(id).populate('seller');
//     return result;
//   } else {
//     throw new APIError(httpStatus.FORBIDDEN, 'Forbidden');
//   }
// };

export const BookService = {
  // createBook,
  getAllBooks,
  // getSingleBook,
  // updateBook,
  // deleteBook,
};
