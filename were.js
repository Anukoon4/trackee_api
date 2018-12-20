var uuid = require('node-uuid');
var JSONStream = require('JSONStream');
var express = require('express');
var were = express.Router();
var base64 = require('base64-stream');


were.post('/add', function (req, res) {
  var key = req.params.id ? req.params.id : '';
  key = (key == '') ? {} : {
    "_id": key
  };
  var value = req.body;
  var collection = req.collection;
  if (!key._id) {
    key['_id'] = uuid.v1().replace(/-/g, '');
    value['_id'] = key['_id'];
  }
  

  let form ={
    track:value.track,
    name:value.name,
    address:value.address,
    sub_distric:value.sub_distric,
    distric:value.distric,
    province:value.province,
    postid:value.postid,
    phone:value.phone,
    description:value.description,
    time:value.time,
    date:value.date
    
  }

  collection.update(key, form, {
    'upsert': true
  }, function(err, resc) {
    if (err) {
      res.json({
        'ok': false,
        'message': err
      });
    } else {
     
      let query ={_id: key['_id']}
      collection.findOne(query).then(function (docs) {
        res.json(docs);
      })
    }
  });
});
were.post('/query', function (req, res) {
  var collection = req.collection;
  var body = req.body;
  var limit = 0;
  limit = body.limit ? parseInt(body.limit) : 0;

  
  let form = {
    track: body.track
  }

  collection.findOne(form).then(function (docs) {
    res.json(docs);
  })
});

were.post('/remove', function (req, res) {
  let collection = req.collection;
  let body = req.body;
  let form ={
    track:body.track
  }

  collection.deleteOne(form, function (err, resc) {
    if (err) {
      res.json({
        'ok': false,
        'message': err
      });
    } else {
      var result = resc.result;
      res.json({
        'ok': result.ok == 1 ? true : false,
      });
    }
  });
});




module.exports = were;