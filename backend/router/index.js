import { Router } from 'express';

import authRouter from './auth.js'
import usersRouter from './users.js'
import pagesRouter from './pages.js'

const router = Router();

router.use('/auth',authRouter);
router.use('/users',usersRouter);
router.use('/',pagesRouter);
export default router;