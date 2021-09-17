//@ts-check

/* eslint-disable no-console */

const express = require('express')
const fs = require('fs')

const app = express()

app.set('views', 'src/views')
app.set('view engine', 'pug')

const USERS = {
    15:{
        nickname:'foo',
        profileImage: undefined
    },
    16:{
        nickname:'bar',
        profileImage: undefined

    }
}

const userRouter = express.Router()

userRouter.get('/', (req,res)=>{
    res.send('User list')
})

// /users/15
userRouter.get('/:id', (req,res)=>{
    res.send('User info with ID')
})

userRouter.post('/',(req,res)=>{
    res.send('register user')
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