import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import session from 'express-session'


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

app.use(cors())


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
       return res.json('logout users')
   }
    else{
        res.json({
            message: 'not logged out',
        })


    }
})

app.post('/register', (req, res) => {
    const {name, email, password, login} = req.body
    let val = {id: Date.now(), email, password, login, role: 'user'};
    users.push(val)
    let newValue = {
        ...val
    }
    delete newValue.password
    req.session.user ={
        newValue
    }

    res.json(users)



})





app.listen(process.env.APP_PORT || 3000, () => {
    console.log('server started')
})
