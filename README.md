pug로 템플릿그려서 html로 컴파일하는 방법
[https://dubaiyu.tistory.com/211]

POST시 enctype = multipart/form-data형태로 받아 저장하고 이용할수있게 도와줌
```npm install multer```

핵심

* router 분리
* router.param('id',...,next) 을 통해 id값 활용해 가공한뒤에 미들웨어를 통해 넘겨줌
* 가공된 값을 잘활용해서 nickname, profileImage를 변경할수있는 restfulAPI 개발(POST)
* uploads폴더도 절대경로static 지정후 API TEST