const express = require('express');

const app = express();

app.get("/user",
(req, res, next) => {
    console.log("handling the route 1");
    // res.send("response");
    next();
},

(req,res,next) => {
    // res.send("response2");
    next();
},

(req,res) => {
    res.send("response3");
});

app.listen(3000, ()=> {
    console.log("server is listening on port 3000...");
});
  