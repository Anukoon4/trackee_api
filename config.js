var _dbs = ['cores'];

var uriQuerySet = "http://localhost:27017";

var mongodb = [];
_dbs.forEach(function(dbName) {
  var obj = new Object();
  obj.db = dbName,
  obj.url = uriQuerySet,
  mongodb.push(obj);
});

module.exports.mongodb = mongodb;
module.exports.port = "3000";