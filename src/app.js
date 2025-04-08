const express = require('express');

const {connectDB} = require("./config/database");
const {User} = require("./models/user")
const app = express();

app.use(express.json());

app.post('/signup', async(req,res)=>{
    // creating a new instance of the user model
    console.log(req.body);
    const user = new User(req.body);
    
    // returns promise and inserts data into the database
    try{
        await user.save();
        res.send("user added successfully");
    }
    catch(err){
        res.status(400).send("error saving the user: ", err.message);
    }
});

connectDB()
.then(() =>{
    console.log("database connection established..");
    app.listen(3000, ()=> {
        console.log("server is listening on port 3000...");
    });
})
.catch((err) => {
    console.error("database cannot be connected");
});

