import { Router } from 'express';
import auth from "../app/middelware/auth.js";
import {changePassword, profile} from "../app/controller/userController.js";
const router = Router();
router.use(auth)

router.get('/profile',profile );
router.post('/changePassword', changePassword)

export default router;