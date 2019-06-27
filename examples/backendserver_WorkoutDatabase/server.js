var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('./dbcon.js');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3215);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

//mysql.pool.query("DROP TABLE IF EXISTS todo", function(err) {
 //  var createString = "CREATE TABLE todo(" + 
 //  "id INT PRIMARY KEY AUTO_INCREMENT," + 
//   "name VARCHAR(255) NOT NULL," +
 //  "rep INT," +
//   "weight INT," +
//   "units BOOLEAN," + 
//   "date DATE)";
//   mysql.pool.query(createString, function(err) {
//      if (err) console.log(err);
//      console.log("todo table created");
//   });
//});

app.get('/', function(req, res) {
   var contents = {};
   if (!req.query.id) {
    mysql.pool.query('SELECT * FROM todo', function(err, rows, fields) {
         if (err) {
            console.log(err);
            return;
         }
         contents.results = JSON.stringify(rows);
         res.render('public',contents);
         res.send(contents);
      });
   } else {
    mysql.pool.query('SELECT * FROM todo WHERE id = ' + req.query.id, function(err, rows, fields) {
        if (err) {
           console.log(err);
           return;
        }
        res.render('public',contents);
        contents.results = JSON.stringify(rows);
        res.send(contents);
     });
   }
   console.log('I got a GET request.');
});

app.put('/', function(req, res) {
   var units = req.query.units === 'kg' ? 0 : 1;
   mysql.pool.query('UPDATE todo SET name=?, rep=?, weight=?, date=?, units=? WHERE id=? ', [req.query.name, req.query.reps, req.query.weight, req.query.date, units, req.query.id], function(err, result) {
      if (err) {
         console.log(err);
         return;
      }
      res.render('form');
   });
});

app.post('/post', function(req, res) {
   var body = req.body;
   var name = body.name === '' ? null : body.name;
   var rep = body.rep;
   var weight = body.weight;
   var date = body.date;
   var units = body.units === 'lbs' ? 0 : 1;
   var values = ["'" + name + "'," + rep + ',' + weight + ",'" + date + "'," + units];
   mysql.pool.query('INSERT INTO todo(name, rep, weight, date, units) VALUES (' + values + ');', function(err, rows, fields) {
      if (err) {
         console.log(err);
         return;
      }
      var data = JSON.stringify(rows);
      res.send(data);
   });
});


app.delete('/', function(req, res) {
   var id = req.query.id;
   var contents = {};
   mysql.pool.query('DELETE FROM todo WHERE id = ' + id, function(err, rows, fields) {
      if (err) {
         next(err);
         return;
      }
      contents.results = JSON.stringify(rows);
      res.send(contents);
   });
});

app.use(function(req, res){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.log(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on port 3215');
});