var express = require('express');
const MongoClient = require('mongodb').MongoClient;

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  const client = new MongoClient(DATABASE_URL, { useNewUrlParser: true });
  let collection;
  client.connect((err) => {
    collection = client.db("test").collection("users");
    console.log(collection);
    // perform actions on the collection object
    client.close();
  });


  res.render('index', { title: 'Express', content: collection.toString()});
});

module.exports = router;
