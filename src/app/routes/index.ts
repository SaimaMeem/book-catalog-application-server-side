import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(moduleRoute => {
  router.use(moduleRoute.path, moduleRoute.route);
});

export default router;
