//@ts-check

/* eslint-disable no-console */

const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.use(express.static('src/public'))

app.set('views', 'src/views')
app.set('view engine', 'pug')

const USERS = {
    15:{
        nickname:'foo',
    },
    16:{
        nickname:'bar',

    }
}

const userRouter = express.Router()

userRouter.get('/', (req,res)=>{
    res.send('User list')
})

//param collback id를 넘겨받으면 어떻게 처리해라~
userRouter.param('id',(req, res, next, value)=>{
    console.log(`id param`,value)
    //@ts-ignore
    req.user = USERS[value]
    next()
})

// /users/15
userRouter.get('/:id', (req,res)=>{
    const resMineType = req.accepts(['json','html'])

    if(resMineType === 'json'){
        //@ts-ignore
        res.send(req.user)
    }else if(resMineType === 'html'){
        res.render('index')
    }else{
        // error handling
    }

    // res.send('User info with ID')
    // console.log('userRouter get ID')
    //@ts-ignore
    // res.send(req.user) //object를 express가 알아서 json을 stringify
})



userRouter.post('/',(req,res)=>{
    res.send('register user')
})

userRouter.post('/:id/nickname', (req,res)=>{
    //@ts-ignore
    const { user } = req
    // req.body에서 닉네임가져오기 undefined에러 => body-purser 모듈필요
    const { nickname } = req.body

    user.nickname = nickname
    res.send(`user nick name updated: ${nickname}`)
})

app.use('/users', userRouter)
app.get('/',(req,res)=>{
    res.render('index',{
        msg:'use me!'
    })
})

const PORT = 5000
app.listen(PORT,()=>{
    console.log(`The express server is listening at prot: ${PORT}`)
})