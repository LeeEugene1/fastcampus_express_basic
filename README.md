nodejs+express 초기환경세팅

1. install npm
```npm install init```
2. install express
```npm install express```
3. install typescript
```npm install --save-dev typescript```
4. express를 쓰면서 type도움을 받을수있음
```npm install --save-dev @types/express```

main.js 초기 세팅

```
//@ts-check

const express = require('express')
const app = express()

// routing
app.use('/',(req, res)=>{
    res.send('hello,express!')
})

const PORT = 5000
app.listen(PORT,()=>{
    console.log(`The express server is listening at prot: ${PORT}`)
})
```
