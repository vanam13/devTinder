const express = require('express');
const app = express();
const { adminauth , userauth } = require('./middlewares/auth');

app.use('/admin', adminauth);

app.use('/user/login', (req,res)=>{
    res.send('user logged in successfully');
});

app.use('/user/data', userauth, (req,res)=>{
    res.send('user data sent');
});

app.get('/admin/getalldata', (req,res)=>{
    res.send('all data sent');
});

app.get('/admin/deletedata', (req,res)=>{
    res.send('all data deleted');
});


app.listen(3000, ()=> {
    console.log("server is listening on port 3000...");
});
  