import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/book/book.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth/',
    route: AuthRoutes,
  },
  {
    path: '/users/',
    route: UserRoutes,
  },
  {
    path: '/books/',
    route: BookRoutes,
  },
];

moduleRoutes.forEach(moduleRoute => {
  router.use(moduleRoute.path, moduleRoute.route);
});

export default router;
