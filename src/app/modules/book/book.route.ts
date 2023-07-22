import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook,
);

// router.get('/:id', BookController.getSingleBook);
router.get('/', BookController.getAllBooks);

// router.patch(
//   '/:id',
//   validateRequest(BookValidation.updateBookZodSchema),
//   BookController.updateBook,
// );

// router.delete('/:id', BookController.deleteBook);

export const BookRoutes = router;
