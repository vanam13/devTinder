const express = require('express');

const app = express();



app.get("/user", (req, res) => {
    console.log(req.query);
    res.send({ firstName: "mahesh", lastName: "vanam"});
});

app.get("/user/:userID/:username/:password", (req, res) =>{
    console.log(req.params);
    res.send({firstName: "mahesh", lastName: "vanam"});
});

app.listen(3000, ()=> {
    console.log("server is listening on port 3000...");
});
