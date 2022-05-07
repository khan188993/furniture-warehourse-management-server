const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.get('/',(req,res)=>{

    res.send('server response send');
})

app.listen(port,()=>{
    console.log('server running on 4000 page');
})
