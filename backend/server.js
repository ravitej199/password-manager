const express = require('express')
const app = express()
var cors = require('cors')
require('dotenv').config()
const bodyparser = require('body-parser')
const { MongoClient } = require('mongodb');
app.use(bodyparser.json())
// or as an es module:
// import { MongoClient } from 'mongodb'
app.use(cors);
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passwordDB';

const port = 3000
async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
   
  
  }
  


app.get('/',async (req,res)=>{
     main();
     const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
})
app.post('/',async (req,res)=>{
     main();
     const password = req.body
     const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success:true, result:findResult})
    
})
app.delete('/',async (req,res)=>{
     main();
     const password = req.body
     const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success:true, result:findResult})
    
})

app.listen(port,()=>{
    console.log(`listening at port ${port}`)
})