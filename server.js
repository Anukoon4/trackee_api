var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var ip = require("ip");

var route = require('./route');
var config = require('./config');
var login = require('./login');
var core = require('./core');
var were = require('./were');


var mongodb = {};
var mongo_new = {};
var app = express();

app.use(cors());
app.use(bodyParser.json({
  limit: '1024mb'
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('*', function (req, res, next) {
  res.set({
    'Access-Control-Expose-Headers': 'Authorization',
    'Content-Type': 'application/json; charset=utf-8',
    'Bind-Address': ip.address() + ':' + config.port
  });
  next();
});

app.param('db', function (req, res, next, value) {
  req.mongodb = mongodb[value];
  next();
});

app.param('collection', function (req, res, next, value) {
   req.collection = req.mongodb.collection(value);
  next();
});

//  app.post('/login',function(req, res, next){
//   req.url = '/_login/cores/user_db';
//   next();
// })

//  app.use('/_login/:db/:collection',login)

 app.post('/core',function(req, res, next){
  req.url = '/_core/cores/track';
  next();
})

 app.use('/core/:db/:collection',core)


app.use('/search/:db/:collection',route);


app.use('/were/:db/:collection',were);


app.get('/servertime', function (req, res) {
  var long_date = new Date().getTime()
  res.send(long_date.toString());
});


const url = 'mongodb://104.248.146.244:27017';
var count = config.mongodb.length;

// config.mongodb.forEach(function (db_config) {
//   MongoClient.connect(url,{ useNewUrlParser: true }, function (err, client) {
//     if (!err) {
//       count--
//       console.log("Connected successfully to server");
//       mongodb[db_config.db] = client.db(db_config.db);
//       console.log(mongodb)

//       if (count == 0) {
//         app.listen(config.port, function () {
//           console.log('Server listening on port %d', this.address().port);
//         })
//       }

//     }
//   })

// })

const dbName = 'cores';
MongoClient.connect(url, function(err, client) {

  mongodb[dbName] = client.db(dbName)
  console.log(mongodb)
  app.listen(3000, function () {
      console.log('Server listening on port %d', this.address().port);
            })
})