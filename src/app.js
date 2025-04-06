const express = require('express');

const app = express();

// app.use("/", (req, res) => {
//     res.send("hello from the dashboard");
// });

app.use("/test", (req, res) => {
    res.send("hello from the server");
});

// app.use("/user", (req, res) => {
//     res.send("hahahah");
// });

app.get("/user", (req, res) => {
    res.send({ firstName: "mahesh", lastName: "vanam"});
});

app.post("/user", (req, res) => {
    res.send("updated user in the database");
});

app.listen(3000, ()=> {
    console.log("server is listening on port 3000...");
});
