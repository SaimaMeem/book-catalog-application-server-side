import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookFilterableFields } from './book.constant';
import { IBook } from './book.interface';
import { BookService } from './book.service';

// const createBook = catchAsync(async (req: Request, res: Response) => {
//   const bookData = req.body;
//   const result = await BookService.createBook(bookData);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Book created successfully',
//     data: result,
//   });
// });

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, bookFilterableFields);
  const result = await BookService.getAllBooks(filters, paginationOptions);
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// const getSingleBook = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await BookService.getSingleBook(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Book retrieved successfully',
//     data: result,
//   });
// });

// const updateBook = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const updatedData = req.body;
//   const person = req.person;
//   const result = await BookService.updateBook(id, person, updatedData);
//   sendResponse<IBook>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Book updated successfully',
//     data: result,
//   });
// });

// const deleteBook = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const person = req.person;
//   const result = await BookService.deleteBook(id, person);
//   sendResponse<IBook>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Book deleted successfully',
//     data: result,
//   });
// });

export const BookController = {
  // createBook,
  getAllBooks,
  // getSingleBook,
  // updateBook,
  // deleteBook,
};
