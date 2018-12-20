var uuid = require('node-uuid');
var JSONStream = require('JSONStream');
var express = require('express');
var _core = express.Router();
var base64 = require('base64-stream');


_core.post('*', function (req, res) {
    
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
    uid:value.uid,
    sender:
    {
      name:value.sender_name,
      address:value.sender_address,
      sub_distric:value.sender_sub_distric,
      distric:value.sender_distric,
      province:value.sender_province,
      postid:value.sender_postid,
      phone:value.sender_phone
    },
    receiver:
    {
      name:value.receiver_name,
      address:value.receiver_address,
      sub_distric:value.receiver_sub_distric,
      distric:value.receiver_distric,
      province:value.receiver_province,
      postid:value.receiver_postid,
      phone:value.receiver_phone
    },
    description:value.description,
    table:
    [
      {
        date:value.date ,
        time: value.time,
        detail:"รับเข้าระบบ",
        province_log:"กรุพเทพมหานคร"
    }
    ]
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




module.exports = _core;