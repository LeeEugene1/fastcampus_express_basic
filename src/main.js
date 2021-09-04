//@ts-check

const express = require('express'
)

const app = express()

// routing
app.use('/',(req, res)=>{
    res.send('hello,express!')
})

const PORT = 5000
app.listen(PORT,()=>{
    console.log(`The express server is listening at prot: ${PORT}`)
})