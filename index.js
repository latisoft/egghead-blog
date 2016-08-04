var express = require('express');
var app = express();
// var fs = require('fs');
var engines = require('consolidate');
// var JSONStream = require('JSONStream');
var bodyParser = require('body-parser');

var User = require('./db').User;

app.engine('hbs', engines.handlebars);

app.set('views', './views');
app.set('view engine', 'hbs');

app.use('/profilepics', express.static('images'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/favicon.ico', function (req, res) {
  res.end();
});

app.get('/', function (req, res) {
  User.find({}, function (err, users) {
    if (err) console.error(err);
    res.render('index', {users: users});
  });
});
// debug: get json list
app.get('/json', function(req, res) {
  User.find().lean().exec(function (err, users) {
    return res.end(JSON.stringify(users, null, 4));
  });
});
app.get('/users/by/:gender', function (req, res) {
  var gender = req.params.gender;
  User.find({'gender': gender}, function (err, users) {
    if (err) console.error(err);
    res.render('index', {users: users});
  });
});
app.get('/addnew', function (req, res) {
  var users = { user: {
    username: 'default'
  }};
  res.render('user', users);
});


app.get('/error/:username', function (req, res) {
  res.status(404).send('No user named ' + req.params.username + ' found');
});

var userRouter = require('./username');
app.use('/:username', userRouter);

var server = app.listen(process.env.PORT || 5000, function () {
  console.log('Server running at http://localhost:' + server.address().port);
});

