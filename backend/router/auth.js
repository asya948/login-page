import { Router } from 'express';
const router = Router();

router.post('/login', (req, res) => {
    res.json({
        message: 'Login',
    })
});
router.post('/register', (req, res) => {
    res.json({
        message: 'Register',
    })
});
router.post('/forgot-password', (req, res) => {
    res.json({
        message: 'Forgot Password',
    })
});
export default router;