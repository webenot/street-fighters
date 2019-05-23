var express = require('express');
const MongoClient = require('mongodb').MongoClient;

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true });
  let collection;
  client.connect((err) => {
    collection = client.db("heroku_zfh39rpk").collection("users");
    console.log(collection);
    // perform actions on the collection object
    client.close();
  });


  res.render('index', { title: 'Express', content: collection.toString()});
});

module.exports = router;
