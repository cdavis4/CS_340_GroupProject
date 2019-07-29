
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('./dbcon.js');
var mysql = require('mysql');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('port', 3215);


app.get('/character',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM character', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.render('home', context);
  });
});

app.set('port', 3213);

//set up static pages
var __dirname = 'http://flip1.engr.oregonstate.edu:3215/public';

app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));

//set up server api

app.use(function(req,res){
    res.status(404);
    res.render('404');
  });
  
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
  });


app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS todo", function(err){
    var createString = "CREATE TABLE todo(" +
    "id INT PRIMARY KEY AUTO_INCREMENT," +
    "name VARCHAR(255) NOT NULL," +
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('main',context);
    })
  });
});

app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO todo (`name`) VALUES (?)", [req.query.c], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('main',context);
  });
});

app.get('/delete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM todo WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Deleted " + result.changedRows + " rows.";
    res.render('main',context);
  });
});

app.put('/put', function(req, res) {
  var units = req.query.units === 'kg' ? 0 : 1;
  mysql.pool.query('UPDATE todo SET name=?, rep=?, weight=?, date=?, units=? WHERE id=? ', [req.query.name, req.query.rep, req.query.weight, req.query.date, units, req.query.id], function(err, result) {
     if (err) {
        console.log(err);
        return;
     }
     res.render('form');
  });
});


 // var values = "'" + name + "'," + reps + ',' + weight + ",'" + date + "'," + units;
 // mysql.pool.query('INSERT INTO todo(name, rep, weight, date, units) VALUES (' + values + ');', function(err, rows, fields) {
 // mysql.pool.query(sql, [name, reps, weight, date, units], function (err, rows,fields) {  
 //if (err) {
  //      console.log(err);
  //      return;
  //   }
  //   var data = JSON.stringify(rows);
  //   res.send(data);
  //});
//});
app.post('/', function(req, res){
  res.render('form');
});
/** 
app.post('/tasks', function(req, res) {
  var body = req.body;
  var name = body.name === '' ? null : body.name;
  var reps = body.rep;
  var weight = body.weight;
  var date = body.date;
  var units = body.units === 'kg' ? 0 : 1;
  var values = "'" + name + "'," + reps + ',' + weight + ",'" + date + "'," + units;
  pool.query('INSERT INTO todo(name, rep, weight, date, units) VALUES (' + values + ');', function(err, rows, fields) {
     if (err) {
        console.log(err);
        return;
     }
     var data = JSON.stringify(rows);
     res.send(data);
  });
});
//app.post('/', function(req, res){
//  res.render('form');
//}); */

var server = app.listen(app.get('port'), function(){
    var port = server.address().port;
    console.log('Express started on port ' + port);
});
