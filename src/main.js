//@ts-check

/* eslint-disable no-console */

const express = require('express')
const fs = require('fs')

const app = express()

// middle ware
// app.use('/', async(req, res, next)=>{
//     console.log('middleware1')
//     const fileContent = await fs.promises.readFile('.gitignore')
//     //@ts-ignore
//     req.fileContent = fileContent
//         next() //next()실행을하지않으면 계속 middleware1이 실행중
// }
// )

// app.use((req,res)=>{
//     console.log('middleware2')
//     //@ts-ignore
//     res.send(`${req.fileContent}`)
// })

const userRouter = express.Router()

userRouter.get('/', (req,res)=>{
    res.send('User list')
})

userRouter.get('/:id', (req,res)=>{
    res.send('User info with ID')
})

userRouter.post('/',(req,res)=>{
    res.send('register user')
})

app.use('/users', userRouter)

const PORT = 5000
app.listen(PORT,()=>{
    console.log(`The express server is listening at prot: ${PORT}`)
})