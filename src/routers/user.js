const express = require('express')
// const bodyParser = require('body-parser')
// app.use(bodyParser.json())

const fs = require('fs')
const router = express.Router()

const USERS = {
    15:{
        nickname:'foo',
        profileImage: undefined,
    },
    16:{
        nickname:'bar',
        profileImage:undefined,

    }
}

// app.use('/users', userRouter)

router.get('/', (req,res)=>{
    res.send('User list')
})

//param collback id를 넘겨받으면 어떻게 처리해라~
router.param('id',async(req, res, next, value)=>{
    try{
        //@ts-ignore
        const user = USERS[value]

        if(!user){
            const err = new Error('User not found')
            err.statusCode = 404
            throw err
            // res.send('에러핸들링은 미들웨어를 통해 main.js에서 구현가능')
        }

        req.user = user
        next()
    }catch(err){
        next(err)
    }

})

// /users/15
router.get('/:id', (req,res)=>{
    const resMineType = req.accepts(['json','html'])

    if(resMineType === 'json'){
        //@ts-ignore
        res.send(req.user)
    }else if(resMineType === 'html'){
        res.render('index',{
            //@ts-ignore
            nickname: req.user.nickname
        })
    }else{
        // error handling
    }

    // res.send('User info with ID')
    // console.log('userRouter get ID')
    //@ts-ignore
    // res.send(req.user) //object를 express가 알아서 json을 stringify
})



router.post('/',(req,res)=>{
    res.send('register user')
})

router.post('/:id/nickname', (req,res)=>{
    //@ts-ignore
    const { user } = req
    // req.body에서 닉네임가져오기 undefined에러 => body-purser 모듈필요
    const { nickname } = req.body

    user.nickname = nickname
    res.send(`user nick name updated: ${nickname}`)
})

module.exports = router