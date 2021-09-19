//@ts-check

const express = require('express'
)
const fs = require('fs')

const app = express()

// 변수 활용법
app.use('/',(req, res, next)=>{
    const requestAt = new Date()
    //@ts-ignore
    req.requestAt = requestAt
    console.log('middleware1')
    next()
})


// 비동기 활용법
app.use('/', async(req,res,next)=>{
    const fileContent = await fs.promises.readFile('.gitignore')
    // @ts-ignore
    req.fileContent = fileContent
    next()
})

//수많은 미들웨어들...

app.use((req, res) => {
    console.log('middleware2')
    //@ts-ignore
    res.send(`hello, express, ${req.requestAt}, ${req.fileContent}`)
})

const PORT = 5000
app.listen(PORT,()=>{
    console.log(`The express server is listening at prot: ${PORT}`)
})