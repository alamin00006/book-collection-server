const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

app.use(express.json());
app.use(cors());
// booktarikul
// UUr8u9p9OU6mNPJz


const uri = "mongodb+srv://booktarikul:UUr8u9p9OU6mNPJz@cluster0.scp6egc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const bookCollection = client.db("bestSellerbooks").collection("bestSeller");

       // get bestSeller books
      app.get('/bestseller', async(req, res) =>{
        const query = {};
        const cursor = bookCollection.find(query);
        const bestSellerBooks = await cursor.toArray();
        res.send(bestSellerBooks);
      })
    }
    finally{

    }
}
run().catch(console.dir)


app.get('/', (req, res) =>{
    res.send('ami tik asi');
})

app.listen(port, () =>{
    console.log('tik ase chalu hoise', port);
})
