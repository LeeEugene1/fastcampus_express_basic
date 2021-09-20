const express = require('express')
const fs = require('fs')
const multer = require('multer')

// multer를 통해 업로드를 받으려면 업로드된파일을 어디에 저장할건지 지정해준다
const upload = multer({ dest: 'uploads/'})

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

//param collback에 걸림 id를 넘겨받으면 어떻게 처리해라~ => 아이디 핸들링
router.param('id',async(req, res, next, value)=>{
    console.log(`id parameter: ${value}`)
    try{
        //@ts-ignore
        const userone = USERS[value]//USERS[15] 즉 {nickname: "foo", profileImage: undefined}

        if(!userone){
            const err = new Error('User not found')
            err.statusCode = 404
            throw err
            // res.send('에러핸들링은 미들웨어를 통해 main.js에서 구현가능')
        }

        //다른 미들웨어에 넘겨주고싶음
        req.user2 = userone

        next()//id파람값을 어떻게 처리할지 결정해서 그다음 라우터에 넘겨줌
    }catch(err){
        next(err)
    }

})

// /users/15
router.get('/:id', (req,res)=>{
    const resMineType = req.accepts(['json','html'])

    if(resMineType === 'json'){
        //@ts-ignore
        res.send(req.user2)//express가 자동으로 object에서 json으로 stringify함
    }else if(resMineType === 'html'){
        res.render('index',{
            //@ts-ignore
            nickname: req.user2.nickname,
            userId: req.params.id,
            imgURL:`/uploads/${req.user2.profileImage}`,
            // imgURL:'/uploads/9ef3dfd2e8ed4d994e6080e7fb292e09',

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
    //req.body {"nickname": "bar"}
    //@ts-ignore
    //req.user2 = {nickname: "foo", profileImage: undefined}
    //req = {15={...}, 16={...}}
    const { user2 } = req
    // req.body에서 닉네임가져오기 undefined에러 => body-purser 모듈필요
    const { nickname } = req.body
    
    // console.log(`user2 ${user2}`)
    // console.log(`nickname ${nickname2}`)

    // user.nickname을 새 닉네임으로 업데이트
    // req.user2.nickname = req.body.nickname
    user2.nickname = nickname

    res.send(`user nickname updated: ${nickname}`)
    //확인방법 : http POST localhost:5000/users/16/nickname nickname=newnew
})

router.post('/:id/profile', upload.single('profile'),(req,res,next)=>{
    // console.log(req.file.filename)
    // const { user2 } = req
  
    // user2.profileImage = req.file.filename
    
    req.user2.profileImage = req.file.filename

    // const { filename } = req.file
    // user2.profileImage = filename

    //bring user
    // const { user } = req
    

    res.send(`User profile image uploaded. ${req.user2.profileImage}`)
})

module.exports = router