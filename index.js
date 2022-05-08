const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 4000;
console.log(process.env.DB_USER)
//middleware use 
app.use(cors());
app.use(express.json());

//DATABASE Connection Setup 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dzplv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    //DATABASE CONNECTED
    await client.connect();
    const furnitureCollection = client.db("FurnitureInventoryManagement").collection("Furniture");
    console.log('connected');
    //GET ALL FURNITURE DATA SUCCESSFULLY
    //url:http://localhost:4000/furniture = for all data get 
    //url2: http://localhost:4000/furniture/price=2004 = for search query ;
    app.get('/furniture',async (req,res)=>{
        const query = req.query;
        const result = await furnitureCollection.find(query).toArray();
        res.send(result);
    })
    
    //POST FURNITURE DATA SUCCESSFULLY
    //url:http://localhost:4000/furniture = post data with object value 
    app.post('/furniture',async (req,res)=>{
        const newFurniture = req.body;
        const result = await furnitureCollection.insertOne(newFurniture);
        res.send({success:"new added successfully"});
    })

    //DELETE FURNITURE DATA SUCCESSFULLY
    //url : http://localhost:4000/furniture/delete/1 = delete data with id value 
    app.delete('/furniture/delete/:id',async (req,res)=>{
        const id = {_id:ObjectId(req.params.id)}
        const result = await furnitureCollection.deleteOne(id)
        res.send({success:"Deleted Item Successfully"});
    })


    //UPDATE FURNITURE DATA SUCCESSFULLY
    app.put('/furniture/update/:id',async (req,res)=>{
        const id = {_id: ObjectId(req.params.id)};
        const updateData = req.body;
        const options = {
            upsert:true,
        }
        const updateDoc = {
            $set:{
                ...updateData
            }
        }

        console.log(updateData);
        const result = await furnitureCollection.updateOne(id,updateDoc,options);

        res.send({success:'updated'});

        //response result 
       /*  {
            "acknowledged": true,
            "modifiedCount": 1,
            "upsertedId": null,
            "upsertedCount": 0,
            "matchedCount": 1
        } */
    })

}
run().catch(console.dir('err'));


//TEST GET API 
app.get('/',(req,res)=>{
    res.send('TESTED GET API ');
})

app.listen(port,()=>{
    console.log('server running on 4000 page');
})

//added items field 
