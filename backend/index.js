import 'dotenv/config'
import express from 'express';
import cors from 'cors';
const app=express();
app.use(cors());

let values=[]
app.get('/',(req,res)=>{
res.json(values);
})

app.post('/add',(req,res)=>{
let value={
    id:Date.now(),
    title:req.body.value,
}
values.push(value)
    res.json(values);
})
app.listen(process.env.APP_PORT||3000,()=>{
    console.log('server started ');
})