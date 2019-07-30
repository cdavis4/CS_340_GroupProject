

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var mysql = require('./dbcon.js');

 /**
   * GLOBAL VARIABLE FOR DATABASE UPDATE DATABASE HERE
   */
 const database = 'cs340_davicarr';


var app = express();
//uses second argument to set port
app.set('port', process.argv[2]);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

  /**
   * ADD HEADERS
   */
app.use((req,res,next)=>  {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
/**
   * STARTS UP SERVER ACCEPTING REQUESTS
**/

var server = app.listen(app.get('port'),() => {
    var port = server.address().port;
    console.log('Express started on port ' + port);
});

  /**
   * GET ALL CHARACTER FROM CHARACTER TABLE

   */
app.get('/characters',(req,res)=> {
    mysql.pool.query('SELECT * FROM ' + database + '.Character',(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});

 /**
   * GET ID AND TYPE NAME FROM TYPE TABLE
   * TO USE IN FILTER
   */
app.get('/types',(req,res)=> {
    mysql.pool.query('SELECT id, type_name FROM ' + database + '.Type',(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});


// GET Type return name of type based on id selection 
//WE REALLY DONT NEED THIS JUST KEPT FOR EXAMPLE
app.get('/type/:id',function(req,res){
    var context = {};
    mysql.pool.query('SELECT id, type_name FROM ' + database + '.Type WHERE id=?', [req.params.id],(err, rows,fields)=>{
      if(err)
      {
        res.json(err);
        console.log(err);
        return;
      }
      console.log(rows);
      res.json(rows);
    });
  });




