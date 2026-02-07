import { Router } from 'express';
import auth from "../app/middelware/auth.js";
import {changePassword, profile} from "../app/controller/userController.js";
const router = Router();
router.use(auth)

router.get('/profile',auth,profile );
router.post('/changePassword',auth, changePassword)

export default router;