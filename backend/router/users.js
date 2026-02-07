import { Router } from 'express';
const router = Router();
router.use(auth)

router.get('/profile', (req, res) => {
    res.json({
        message: 'users profile',
    })
});
router.post('/changePassword', (req, res) => {
    res.json({
        message: 'password changed',
    })
});
export default router;