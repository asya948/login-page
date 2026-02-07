import 'dotenv/config'
import express, {json} from 'express'
import cors from 'cors'
import session from 'express-session'
import {readFile, writeFile} from 'fs/promises'
import bcrypt from 'bcrypt'
import router from "./router/index.js";


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    session({
        secret: 'mySecretKey123',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24
        }
    })
)

app.use(
    cors({
        origin: 'http://localhost:63342',
        credentials: true
    })
)
app.use(router)

let users = []

app.post('/login', (req, res) => {
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
})

app.get('/profile', (req, res) =>  {
   if(req.session.user){
       return res.json(req.session.user)
    }else{
        res.json({
            message: 'not logged in',
        })


    }
})

app.get('/logout', (req, res) => {

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

app.post('/register', async (req, res) => {
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



})

app.get('/admin', (req, res) => {
    if(req.session.user.newValue.role === 'admin'){

        return res.json(users)

    }
    res.json({message: 'not logged in'})
})

app.get('/check/:psw', async (req, res) => {
    const { psw } = req.params

    const hashedPassword = await bcrypt.hash('password', 10)

    const isMatch = await bcrypt.compare(psw, hashedPassword)

    if (isMatch) {
        return res.json(true)
    }

    res.json({ message: 'password not match' })
})

app.post('/change', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            ok: false,
            message: 'Not logged in'
        })
    }

    res.json({
        ok: true,
        message: 'You can change password',
        user: req.session.user
    })
})



app.listen(process.env.APP_PORT || 3000, () => {
    console.log('server started')
})
