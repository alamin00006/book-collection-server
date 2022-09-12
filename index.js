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
        const uposohokariCollection = client.db("bestSellerbooks").collection("uposohokari");
        const nonTechCollection = client.db("bestSellerbooks").collection("nonTech");
        const sohokariCollection = client.db("bestSellerbooks").collection("sohokari");
        const admissionCollection = client.db("bestSellerbooks").collection("admission");
        const treadCollection = client.db("bestSellerbooks").collection("treadCourse");

       // get bestSeller books
      app.get('/bestseller', async(req, res) =>{
        const query = {};
        const cursor = bookCollection.find(query);
        const bestSellerBooks = await cursor.toArray();
        res.send(bestSellerBooks);
      })

      app.get('/productDetails/:id', async(req, res) =>{
        const id = req.params.id;
        console.log('id',id)
        const query = {_id:ObjectId(id)};
        const result =await bookCollection.findOne(query);
        console.log(result)
          res.send(result)
  
    })

    // get uposohokary book

    app.get('/uposohokari', async(req, res) =>{
        const query = {};
        const cursor = uposohokariCollection.find(query);
        const uposohokariBooks = await cursor.toArray();
        res.send(uposohokariBooks);
      })

      app.get('/product2Details/:id', async(req, res) =>{
        const id = req.params.id;
        console.log('id',id)
        const query = {_id:ObjectId(id)};
        const result =await uposohokariCollection.findOne(query);
        console.log(result)
          res.send(result)
  
    })

    // get non-tech book

    app.get('/nonTech', async(req, res) =>{
        const query = {};
        const cursor = nonTechCollection.find(query);
        const nonTechBooks = await cursor.toArray();
        res.send(nonTechBooks);
      })

      app.get('/product3Details/:id', async(req, res) =>{
        const id = req.params.id;
        console.log('id',id)
        const query = {_id:ObjectId(id)};
        const result =await nonTechCollection.findOne(query);
        console.log(result)
          res.send(result)
  
    })
    // get sohokari book

    app.get('/sohokari', async(req, res) =>{
        const query = {};
        const cursor = sohokariCollection.find(query);
        const sohokariBooks = await cursor.toArray();
        res.send(sohokariBooks);
      })

      app.get('/product4Details/:id', async(req, res) =>{
        const id = req.params.id;
        console.log('id',id)
        const query = {_id:ObjectId(id)};
        const result =await sohokariCollection.findOne(query);
        console.log(result)
          res.send(result)
  
    })
    // get Admission book

    app.get('/admission', async(req, res) =>{
        const query = {};
        const cursor = admissionCollection.find(query);
        const admissionBooks = await cursor.toArray();
        res.send(admissionBooks);
      })

      app.get('/product5Details/:id', async(req, res) =>{
        const id = req.params.id;
        console.log('id',id)
        const query = {_id:ObjectId(id)};
        const result =await admissionCollection.findOne(query);
        console.log(result)
          res.send(result)
  
    })
    // get treadCourse book

    app.get('/treadCourse', async(req, res) =>{
        const query = {};
        const cursor = treadCollection.find(query);
        const sohokariBooks = await cursor.toArray();
        res.send(sohokariBooks);
      })

      app.get('/product6Details/:id', async(req, res) =>{
        const id = req.params.id;
        console.log('id',id)
        const query = {_id:ObjectId(id)};
        const result =await treadCollection.findOne(query);
        console.log(result)
          res.send(result)
  
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
