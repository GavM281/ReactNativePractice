const express = require("express");
// const http = require("http");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
require("./user")
const User = mongoose.model("user")


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//
mongoose.connect('mongodb+srv://admin:adminpw@cluster0.7r0lbkj.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected", () => {
    console.log("Connected")
})
mongoose.connection.on("error", (err) => {
    console.log("error", err)
})
//https://www.youtube.com/watch?v=lXR3SCKAec4

// app.get('/',  (req, res) => {
//     res.send("hello");
// });

app.get('/', (req, res) => {
    console.log("Getting Users");
    User.find({}).then(data =>{
        console.log("data: ", data)
        res.send(data)
    }).catch(err => {
        console.log(err);
    })
})

app.post('/createUser', (req, res) =>{
    const user = new User({
        name: req.body.name
    })
    user.save().then(data =>{
        console.log(data)
        res.send(data);
    }).catch(err => {
        console.log("error", err)
    })
})

app.post('/delete',(req,res) => {
    console.log("Going to delete");
    User.findByIdAndRemove(req.body.id).then(data => {
        console.log("data ",data)
        res.send(data)
    }).catch(err => {
        console.log("error", err)
    })
})

app.post('/update', (req, res) => {
    console.log("Going to update");
    User.findByIdAndUpdate(req.body.id, {
        name: req.body.name
    }).then(data => {
        console.log(data);
        res.send(data)
    }).catch(err => {
        console.log("error", err)
    })
})

app.listen(3000, function () {
    console.log("Running on port: " + 3000 + "\n");
});