const express = require('express');

const {connectDB} = require("./config/database");
const {User} = require("./models/user")
const app = express();

app.use(express.json());

app.post('/signup', async(req,res)=>{
    // creating a new instance of the user model
    const user = new User(req.body);
    
    // returns promise and inserts data into the database
    try{
        await user.save();
        res.send("user added successfully");
    }
    catch(err){
        res.status(400).send("error saving the user: " + err.message);
    }
});

// find user by email
app.get('/user', async(req, res)=>{
    const userEmail = req.body.emailId;
    try{
        const user = await User.find({emailId: userEmail});
    if (!user){
        res.send("user not found");
    }
    else{
        res.send(user);
    }
    }
    catch (err){
        res.send("something went wrong");
    }
    
});

// get all users
app.get('/feed', async(req, res)=>{
    try{
        const users = await User.find({});
        if (users.length === 0){
            res.send('users doesnot exist');
        }
        else{
            res.send(users);
        }
    }
    catch (err){
        res.send("something went wrong");
    }
});

// find by _id
app.get('/id', async(req, res)=>{
    const id = req.body._id
    try{
        const users = await User.findById(id);
        if (users.length === 0){
            res.send('users doesnot exist');
        }
        else{
            res.send(users);
        }
    }
    catch (err){
        res.send("something went wrong");
    }
});

//delete data from the database
app.delete("/user", async(req, res)=>{
    const userId = req.body.userId;
    try{
        const users = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully");
    }
    catch (err){
        res.send("something went wrong");
    }
});

//update data of the user
app.patch('/user/:userId', async(req, res)=>{
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const ALLOWED_UPDATES = ["userId", "photoUrl", "gender", "age","skills"];
        const isUpdateAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));
        if (!isUpdateAllowed){
            throw new Error("update not allowed")
        }
        if(data?.skills.length > 10){
            throw new Error("skills cannot be more than 10");
        }
        const user = await User.findByIdAndUpdate({_id:userId}, data, {
            runValidators: true,
        });
        res.send("user updated successfully");
    }
    catch(err){
        res.status(400).send("UPDATE FAILED "+err.message);
    }
});

//update data of the user by emailid
// app.patch('/user', async(req, res)=>{
//     const emailId = req.body.emailId;
//     const data = req.body;
//     try{
//         const user = await User.find({emailId: emailId}, data);
//         console.log(user);
//         res.send("user updated successfully - email");
//     }
//     catch(err){
//         res.status(400).send("something went wrong");
//     }
// });


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

