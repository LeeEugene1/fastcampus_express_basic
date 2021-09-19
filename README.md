
h1. 미들웨어 기초
- 여러개 함수(미들웨어)들이 연속적으로 동작하는것
- 인자로 next를 받아서 next()를 실행해야만 그 다음 미들웨어가 실행된다.
- 오직 개발자만이 미들웨어가 언제끝날지 정할수있고 next()를 호출해야만 그 미들웨어 실행이 끝나서 다음 미들웨어가 동작함

```
app.use('/',(req, res, next)=>{
    
    console.log('middleware1')
    next()
})

app.use((req, res) => {
    console.log('middleware2')
    res.send('hello, express')
})
})
```

h1. 사용법
앞의 미들웨어를 맨 마지막 미들웨어에 넘겨주기
```
    app.use('/',(req, res, next)=>{
        const requestAt = new Date()
        //@ts-ignore
        req.requestAt = requestAt
        console.log('middleware1')
        next()
    }
    )

    //수많은 미들웨어들...

    app.use((req, res) => {
        console.log('middleware2')
        //@ts-ignore
        res.send(`hello, express, ${req.requestAt}`)
    })
```

h1. 비동기작업에서의 미들웨어의 활용
- nodejs는 모두 비동기작업으로 이루어진다. 위와 마찬가지로 변수로 할당하여 다른 미들웨어등에 사용할수있다.
```
const fs = require('fs')

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
    res.send(`hello, express, ${req.fileContent}`)
})
```