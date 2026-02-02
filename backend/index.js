import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import session from 'express-session'

const app = express()

app.use(express.json())

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
app.use(express.json())

let users = []

app.get('/login', (req, res) => {
   const { login, password } = req.query
  let usersValues=  users.find(user => user.login === login && user.password === password)
    if(usersValue){
        res.session.user = usersValues
        return res.json(usersValues)
    }else{
       res.json({
           message: 'invalid login password',
       })


    }
})



app.listen(process.env.APP_PORT || 3000, () => {
    console.log('server started')
})
