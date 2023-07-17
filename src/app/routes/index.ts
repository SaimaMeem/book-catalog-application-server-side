import express from 'express';
import { BookRoutes } from '../modules/book/book.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/books/',
    route: BookRoutes,
  },
];

moduleRoutes.forEach(moduleRoute => {
  router.use(moduleRoute.path, moduleRoute.route);
});

export default router;
