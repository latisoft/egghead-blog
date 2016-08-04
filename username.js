var express = require('express');
// var helpers = require('./helpers');
// var fs = require('fs');

var User = require('./db').User;

var router = express.Router({
  mergeParams: true
});

router.use(function (req, res, next) {
  console.log(req.method, 'for', req.params.username, 'at', req.path);
  next();
});

router.get('/', function (req, res) {
  var username = req.params.username;
  User.findOne({username: username}, function (err, user) {
    if (err) console.error(err);
    res.render('user', {
      user: user,
      address: user.location
    });
  });
});

router.use(function (err, req, res, next) {
  if (err) console.error(err.stack);
  res.status(500).send('Something broke!');
});

router.put('/', function (req, res) {
  var username = req.params.username;

  User.findOne({username: username}, function (err, user) {
    if (err) console.error(err);

    console.log("req.body: ", req.body);
    
    user.name.full = req.body.name;
    user.location = req.body.location;
    user.save(function () {
      res.end();
    });
  });
});

router.delete('/', function (req, res) {
  var username = req.params.username;

  User.findOne({username: username}).remove().exec(function (err, user) {
    if (err) console.error(err);
    res.sendStatus(200);
  });

});

module.exports = router;
