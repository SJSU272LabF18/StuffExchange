const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');



const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

var Schema = mongoose.Schema;
ObjectId = mongoose.Types.ObjectId;

// Schemas
// Item schema
var itemSchema = new Schema({
  Name: String,
  ItemDesciption : String,
  ItemCondition : String,
  Category : String,
  UserID : ObjectId,
  ImageURL : String,
  PairedWith: [{type: Schema.Types.ObjectId, ref: 'itemSchema'}],
  MatchedWith : [{type: Schema.Types.ObjectId, ref: 'itemSchema'}]
  }, {collection : 'Items'});

//user schema
var userSchema = new Schema({
Fname: String,
Lname : String,
Password : String,
EmailAddress : String,
Items : [{type: Schema.Types.ObjectId, ref: 'itemSchema'}],
ImageURLs : [String]
}, {collection : 'Users'});

//Mongoose models
var itemData = mongoose.model('Items',itemSchema);
var userData = mongoose.model('Users',userSchema);

//Mongo URI
mongoose.connect("mongodb://admin:H0la!@13.57.234.163/Scambio?authSource=admin");
const mongoURI = 'mongodb://admin:H0la!@13.57.234.163/Scambio?authSource=admin';

//CReate mongo connection
const conn = mongoose.createConnection(mongoURI);

//Init gfs
let gfs;

conn.once('open',()=> {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})

//Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads' //bucket name should match the collection name
          };
          resolve(fileInfo);
        });
      });
    }
  });

  const upload = multer({ storage });


  app.post('/user/login',(req,res)=>{
    console.log("nside login api");
    var inputJson = req.body;
    var query = {EmailAddress: inputJson["EmailAddress"]};
    userData.findOne(query)
    .then(function (data){
        if(data["Password"]==inputJson["Password"]){
            res.status(200).send("Valid user");
        }
        else
            res.status(400).send("Invalid user");
    })
    .catch(err => {
        res.status(400).send("Error occured: "+err);
    });
  });

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
