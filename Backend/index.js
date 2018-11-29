//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

var Users = [{
    username: "admin",
    password: "admin"
}]

var books = [
    { "BookID": "1", "Title": "Book 1", "Author": "Author 1" },
    { "BookID": "2", "Title": "Book 2", "Author": "Author 2" },
    { "BookID": "3", "Title": "Book 3", "Author": "Author 3" }
]

var junks = [
    {  "JunkID":"1", "Title": "First Junk", "Description": "Lorem Ipsum", "ImgUrl": "https://images-na.ssl-images-amazon.com/images/I/61IgIqKfWTL.jpg", "condition": "fairly-used"  },
    {  "JunkID":"2", "Title": "Second Junk", "Description": "Lorem Ipsum", "ImgUrl":  "https://cdn.shopify.com/s/files/1/1755/5355/products/mock-10-2122-14213D-nh-ns-111802514472174936291489614087-3_1800x.png", "condition": "fairly-used"  },
    {  "JunkID":"3", "Title": "Third Junk", "Description": "Lorem Ipsum", "ImgUrl": "http://bobs.net/images/products/t-shirts/mens/badge/Bobs-Big-Boy-Badge-Shirt-Use.jpg", "condition": "fairly-used"  },
    {  "JunkID":"4", "Title": "Forth Junk", "Description": "Lorem Ipsum", "ImgUrl": "https://cdn.shopify.com/s/files/1/1755/5355/products/mock-10-2122-14213D-nh-ns-111802514472174936291489614087-3_1800x.png", "condition": "fairly-used"  },
    {  "JunkID":"5", "Title": "Fifth Junk", "Description": "Lorem Ipsum", "ImgUrl": "https://images-na.ssl-images-amazon.com/images/I/61IgIqKfWTL.jpg", "condition": "fairly-used"  },
    {  "JunkID":"6", "Title": "Sixth Junk", "Description": "Lorem Ipsum", "ImgUrl": "http://bobs.net/images/products/t-shirts/mens/badge/Bobs-Big-Boy-Badge-Shirt-Use.jpg", "condition": "fairly-used"  },
    {  "JunkID":"7", "Title": "Seventh Junk", "Description": "Lorem Ipsum", "ImgUrl":"https://cdn.shopify.com/s/files/1/1755/5355/products/mock-10-2122-14213D-nh-ns-111802514472174936291489614087-3_1800x.png", "condition": "fairly-used"  },
    {  "JunkID":"8", "Title": "Sixth Junk", "Description": "Lorem Ipsum", "ImgUrl": "http://bobs.net/images/products/t-shirts/mens/badge/Bobs-Big-Boy-Badge-Shirt-Use.jpg", "condition": "fairly-used"  }
]



//Scambio-start
app.get('/getjunks', function(req, res){
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    console.log("Junks : ", JSON.stringify(junks));
    res.end(JSON.stringify(junks));
});

//Scambio-end
//Route to handle Post Request Call
app.post('/user/login', function (req, res) {


    console.log("Inside Login Post Request");
    console.log("Req Body : ", req.body);
    Users.filter(function (user) {
        if (user.username === req.body.EmailAddress && user.password === req.body.Password) {
            res.cookie('cookie', "admin", { maxAge: 900000, httpOnly: false, path: '/' });
            req.session.user = user;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Successful Login");
        }
    })


});

//Route to get All Books when user visits the Home Page

app.get('/ping', function(req, res) {
    console.log("Inside Ping");
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end("Hello");
})

app.get('/home', function (req, res) {
    console.log("Inside Home Login");
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    console.log("Books : ", JSON.stringify(books));
    res.end(JSON.stringify(books));

})

//Route to create book
app.post('/create', function (req, res) {
    var newBook = { BookID: req.body.params.BookID, Title: req.body.params.Title, Author: req.body.params.Author };
    books.push(newBook);
    console.log('newBook ' + newBook)
    console.log("Book Added Successfully!!!!");
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    })
    res.end('/home')


});

//Route to Delete

app.delete('/delete/:BookID', function (req, res) {
    console.log("Inside Delete Request");
    var index = books.map(function (book) {
        return book.BookID;
    }).indexOf(req.params.BookID);
    console.log("req.params.BookID " + req.params.BookID)
    console.log("index " + index)

    if (index === -1) {
        console.log("Book Not Found");
    } else {
        books.splice(index, 1);
        console.log("Book : " + req.params.BookID + " was removed successfully");
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        res.end('/home')
    }
})
//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
