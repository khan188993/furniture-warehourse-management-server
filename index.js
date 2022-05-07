const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 4000;

//middleware use 
app.use(cors());
app.use(express.json());

//DATABASE Connection Setup 
const uri = "mongodb+srv://arfankhan:AmKj8HzLIQ7BKQ4R@cluster0.dzplv.mongodb.net/FurnitureInventoryManagement?retryWrites=true&w=majority";
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
        console.log(query);
        const result = await furnitureCollection.find(query).toArray();
        console.log(result);
        res.send(result);
    })
    
    //POST FURNITURE DATA SUCCESSFULLY
    //url:http://localhost:4000/furniture = post data with object value 
    app.post('/furniture',async (req,res)=>{
        const newFurniture = req.body;
        console.log(newFurniture);
        const result = await furnitureCollection.insertOne(newFurniture);
        res.send("new added");
    })

    //DELETE FURNITURE DATA SUCCESSFULLY
    //url : http://localhost:4000/furniture/delete/1 = delete data with id value 
    app.delete('/furniture/delete/:id',async (req,res)=>{
        const id = {_id:ObjectId(req.params.id)}
        const result = await furnitureCollection.deleteOne(id)
        res.send('delete api');
    })

    //UPDATE FURNITURE DATA SUCCESSFULLY
    //url : http://localhost:4000/furniture/update/2 = update data with id 
    app.put('/furniture/update/:id',async (req,res)=>{
        const id = {_id:ObjectId(req.params.id)}
        const updateData = req.body;
        const options = {
            upsert:true,
        }
        const updateDoc = {
            $set:{
                ...updateData
            }
        }

        const result = await furnitureCollection.updateOne(id,updateDoc,options);
        res.send(result);
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
