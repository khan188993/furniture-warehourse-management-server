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
    await client.connect();
    console.log('connected');
    const furnitureCollection = client.db("FurnitureInventoryManagement").collection("Furniture");
}
run().catch(console.dir('err'));


app.get('/',(req,res)=>{

    res.send('server response send');
})

app.listen(port,()=>{
    console.log('server running on 4000 page');
})
