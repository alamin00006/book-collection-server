const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const jwt = require('jsonwebtoken');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

app.use(express.json());
app.use(cors());
// booktarikul
// UUr8u9p9OU6mNPJz

function  verifyJWT(req, res, next){
  const authHeader = req.headers.authorization;
  if(!authHeader){
      return res.status(401).send({message: 'UnAthorized access'})
  }
  const token = authHeader.split(' ')[1];
 
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
      // console.log('decoded',decoded)
      if(err){
          
      return  res.status(403).send({message: "Forbidden access"})
      }
      req.decoded = decoded;
    
      next()
    });
  }
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.scp6egc.mongodb.net/?retryWrites=true&w=majority`;
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
        const cartCollection = client.db("allCart").collection("carts");
        const userOrderCollection = client.db("allCart").collection("carts");
        const userCollection = client.db('allUsers').collection('users');
        const orderCollection = client.db('orders').collection('order');


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
    // app.get('/order', async(req, res) =>{
    //     const query = {};
    //     const cursor = orderCollection.find(query);
    //     const sohokariBooks = await cursor.toArray();
    //     res.send(sohokariBooks);
    //   })

      app.get('/product6Details/:id', async(req, res) =>{
        const id = req.params.id;
        console.log('id',id)
        const query = {_id:ObjectId(id)};
        const result =await treadCollection.findOne(query);
        console.log(result)
          res.send(result)
  
    })
      app.get('/orderDetails/:id', async(req, res) =>{
        const id = req.params.id;
        console.log('id',id)
        const query = {_id:ObjectId(id)};
        const result =await orderCollection.findOne(query);
        console.log(result)
          res.send(result)
  
    })



    
    // app.post('/carts', verifyJWT, async (req, res) =>{
    //   const cart = req.body;
    //   const result = await cartCollection.insertOne(cart);
    //   return res.send({success: true,result})
    // })
    app.post('/order', async (req, res) =>{
      const cart = req.body;
      const result = await orderCollection.insertMany(cart);
      return res.send({success: true,result})
    })
    app.get('/order/:user', async(req, res) =>{
      const user = req.params.user;
      // console.log('id',user)
      const result =await orderCollection.find({user}).toArray();
      res.send(result)
  })
 
 
    app.delete('/carts/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id:ObjectId(id)};
      const result =await cartCollection.deleteOne(query);
     
      res.send(result)
  
  })

  app.put('/user/:email',  async(req, res) =>{
    const email = req.params.email;
    const user = req.body;
    const filter = {email: email};
    const options = {upsert: true}
    const updateDoc ={
        $set: user
    };
    const result = await userCollection.updateOne(filter, updateDoc, options);
    const token = jwt.sign({email: email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' })
    res.send({result, token});
    })

    app.put('/carts/:id', async(req, res) =>{
      const id = req.params.id;
      const updatedQuantity = req.body;
      console.log(updatedQuantity)
      const filter = {_id: ObjectId(id)};
      const options = { upsert: true };
      const updatedFinal = {
          $set: {
             quantity:updatedQuantity.quantity,
             totalPrice:updatedQuantity.totalPrice
          }
      };
    
      // console.log(updatedFinal)
      const result = await cartCollection.updateOne(filter,updatedFinal, options);
      res.send(result);
  
  })
  //   app.put('/carts/:id', async(req, res) =>{
  //     const id = req.params.id;
  //     const updatedPrice = req.body;
  //     console.log(updatedPrice)
  //     const filter = {_id: ObjectId(id)};
  //     const options = { upsert: true };
  //     const updatedFinal = {
  //         $set: {
  //            price:updatedPrice.price
  //         }
  //     };
    
  //     // console.log(updatedFinal)
  //     const result = await cartCollection.updateOne(filter,updatedFinal, options);
  //     res.send(result);
  
  // })

  
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
