const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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

    //GET ALL FURNITURE DATA SUCCESSFULLY
    app.get('/furniture',async (req,res)=>{
        const query = req.query;
        const result = await furnitureCollection.find(query).toArray();
        console.log(result);
        res.send(result);
    })
    
    //POST FURNITURE DATA SUCCESSFULLY
    app.post('/furniture',async (req,res)=>{
        const newFurniture = req.body;
        console.log(newFurniture);
        const result = await furnitureCollection.insertOne(newFurniture);
        res.send("new added");
    })

}
run().catch(console.dir('err'));


app.get('/',(req,res)=>{

    res.send('server response send');
})

app.listen(port,()=>{
    console.log('server running on 4000 page');
})
