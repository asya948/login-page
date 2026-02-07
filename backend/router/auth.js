import { Router } from 'express';
import bcrypt from "bcrypt";
import {readFile, writeFile} from "fs/promises";
const router = Router();

router.post('/login', (req, res) => {

        const { login, password } = req.body
        let usersValues=  users.find(user => user.login.toLowerCase() === login.toLowerCase() && user.password === password)
        if(usersValues){
            let newUser = {
                ...usersValues,
            }
            delete newUser.password
            req.session.user = newUser
            return res.json(newUser)
        }else{
            res.json({
                message: 'invalid login password',
            })


        }

});
router.post('/register', async (req, res) => {
    const {name, email, password, isAdmin} = req.body
    if(!name || !email || !password){
        return  res.status(400).json({
            message: 'invalid email or password',
        })
    }

    const hashedPassword = await bcrypt.hash(password,10)

    let val = {id: Date.now(), name, email, password:hashedPassword , role:isAdmin?'admin':'user'};
    users.push(val)

    let data=await readFile('users.json','utf-8')
    data = JSON.parse(data)
    data.push(val)
    await writeFile('users.json',JSON.stringify(data,null,2))

    delete val.password

    req.session.user ={
        newValue:val
    }

    res.json(val)




});
router.post('/check/:psw', async (req, res) => {
    const { psw } = req.params

    const hashedPassword = await bcrypt.hash('password', 10)

    const isMatch = await bcrypt.compare(psw, hashedPassword)

    if (isMatch) {
        return res.json(true)
    }

    res.json({ message: 'password not match' })
})
router.post('/logout', (req, res) => {
    if(req.session.user){
        req.session.user = null
        return res.json('logout users.json')
    }
    else{
        res.json({
            message: 'not logged out',
        })


    }
})
router.post('/admin', (req, res) => {
    if(req.session.user.newValue.role === 'admin'){

        return res.json(users)

    }
    res.json({message: 'not logged in'})
})

export default router;