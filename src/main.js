//@ts-check

/* eslint-disable no-console */

const express = require('express')

const app = express()

// const bodyParser = require('body-parser')
// app.use(bodyParser.json()) 적용하겠다는뜻
//신버전에서는 아래것이 다해줌
app.use(express.json())

app.set('views', 'src/views')
app.set('view engine', 'pug')

const PORT = 5000

const userRouter = require('./routers/user')

app.use('/users', userRouter)
app.use('/public', express.static('src/public'))
app.use('/uploads', express.static('uploads'))

// 에러핸들링 미들웨어, express 는 4개를 받으면 자동으로 에러로 인식
app.use((err, req, res, next)=>{
    res.statusCode = err.statusCode || 500
    res.send(err.message)
})

app.listen(PORT,()=>{
    console.log(`The express server is listening at port: ${PORT}`)
})