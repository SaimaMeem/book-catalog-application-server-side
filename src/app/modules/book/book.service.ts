import { SortOrder } from 'mongoose';
import { PaginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { bookSearchableFields } from './book.constant';
import { IBook, IBookFilters } from './book.interface';
import { Book } from './book.model';

const createBook = async (book: IBook): Promise<IBook | null> => {
  const result = await Book.create(book);
  return result;
};

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
    const filteredConditions = Object.entries(filtersData)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([field, value]) => value) // Filtering to handle falsy values
      .map(([field, value]) => {
        if (field === 'publicationYear' || field === 'genre') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          value = typeof value === 'string' && (value as any).split(',');
          const check =
            field === 'publicationYear' ? 'publicationDate' : 'genre';
          return {
            [check]: {
              $in: value.map(item => new RegExp(`${item}`, 'i')),
            },
          };
        } else {
          return {
            [field]: new RegExp(`^${value}$`, 'i'),
          };
        }
      });

    if (filteredConditions.length > 0) {
      andConditions.push({ $and: filteredConditions });
    }
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

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  return result;
};

const updateBook = async (
  id: string,
  // person: JwtPayload | null,
  payload: Partial<IBook>,
): Promise<IBook | null> => {
  // const book = await Book.findById(id, { seller: 1, _id: 0 });
  // if (book?.seller.toString() === person?.id) {
  const result = await Book.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
  // } else {
  //   throw new APIError(httpStatus.FORBIDDEN, 'Forbidden');
  // }
};

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
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  // deleteBook,
};
