var express = require('express');
var cors = require('cors')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

/////////////////////////////////////////////////////////////////////////////////////////////////
// let dbURI = "mongodb+srv://dbuser:dbpassword@cluster0.9qvbs.mongodb.net/abc-database";
let dbURI = "mongodb+srv://legend:legend123@cluster0.2c3x6.mongodb.net/testdb?retryWrites=true&w=majority";

// let dbURI = 'mongodb://localhost:27017/abc-database';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});


process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////



var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    phone: String,
    password: String,
    createdOn: { type: Date, 'default': Date.now }
});
var userModel = mongoose.model("users", userSchema);



app.post("/signup", (req, res, next) => {

    if (
        !req.body.name
        || !req.body.email
        || !req.body.phone
        || !req.body.gender
        || !req.body.password) {
        res.status(403).send(`
    please send name, email, passwod, phone and gender in json body.
    e.g:
    {
        "name": "Muddassir",
        "email": "muddassir@gmail.com",
        "gender": "Male"
        "phone": "03001234567",
        "password": "abc",
    }` )
        return

    }


    var newUser = new userModel({
        "name": req.body.name,
        "email": req.body.email,
        "gender": req.body.gender,
        "phone": req.body.phone,
        "password": req.body.password,
    })


    newUser.save((err, data) => {
        if (!err) {
            res.send("user created")
        } else {
            console.log(err);
            res.status(500).send("user create error, " + err)
        }
    });
})
app.post('/login', function (req, res) {
    if (
        !req.body.email
        || !req.body.password) {
        res.status(403).send(`
            please send  email, passwod, 
            e.g:
            {
                "email": "muddassir@gmail.com",
                "password": "abc",
            }` )
        return

    }
    email = req.body.email;
    password = req.body.password;
    MongoClient.connect(urldb, function (err, db) {
        var dbo = db.db('LCC');
        var query = { email: email, password: password }
        dbo.collection('Users').find(query, function (err, user) {
            if (err) throw new Error(err);
            if (!user)
                console.log('Not found');
            else
                console.log('Found!');
        })
        db.close();
        res.end();
    });
});

// app.post("/login", (req,res,next) =>{
//     if (
//          !req.body.email
//         || !req.body.password) {
//         res.status(403).send(`
//     please send  email, passwod, 
//     e.g:
//     {
//         "email": "muddassir@gmail.com",
//         "password": "abc",
//     }` )
//     return

//     }

//     res.send("login successfull")
// })



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})