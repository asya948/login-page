import { Router } from 'express';
const router = Router();

router.get('/',(req,res)=>{
    res.send('Welcome page');
});
router.get('/about',(req,res)=>{
    res.send('about page');
});
router.get('/service',(req,res)=>{
    res.send('Service page');
});
export default router;