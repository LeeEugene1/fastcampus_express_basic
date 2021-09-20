
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:1234@cluster0.feldq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

async function main(){
    // 클라이언트접속
    await client.connect()

    // 다큐먼트들의 집합인 콜랙션 지정 암꺼나 지정해도됨
    const users = client.db('fc21').collection('users')
    //항상 유저스 콜렉션은 비워진다~
    await users.deleteMany({})
    //테스트로 한번넣어보겠음
    await users.insertMany([
        {
            name:'foo',
        },
        {
            name:'bar',
        },
    ])

    //업데이트 foo를 fff로해보자
    await users.updateOne(
        {
            name:'foo',
        },
        {
           $set:{
                name:'fff',
            }     
        }
    )

    // 가져오기+조건
    const cursor = users.find({})
    await cursor.forEach(console.log)
    await client.close()
}

main()