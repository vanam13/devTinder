const express = require('express');
const app = express()

app.get('/getuserdata', (req, res)=>{
    try{
        throw new Error("asfsf");
        res.send("user data sent");
    }
    catch(err){
        res.status(500).send("some error contact support team");
    }
});

app.use('/', (err, req, res, next) =>{
    if(err){
        res.status(500).send("something went wrong");
    }
});

app.listen(3000, ()=> {
    console.log("server is listening on port 3000...");
});
  