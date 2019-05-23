var express = require('express');
var router = express.Router();

const {getName, saveName} = require('../services/user.service');
const {isAuthorized} = require('../middlewares/auth.middleware');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(`Welcome!`);
});

router.post('/', isAuthorized, function(req, res, next) {
  const userName = getName(req.body);
  const saveUserName = saveName(req.body);

  if (userName) {
    res.send(`Your name is ${userName}`);
  } else {
    res.status(400).send('No user name');
  }

});

module.exports = router;
