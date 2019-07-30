

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var mysql = require('./dbcon.js');


var app = express();
app.set('port', 4032);
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
   * GET ALL CHARACTER FROM CHARACTER TABLE

   */
app.listen(app.get('port'),() => console.log('Express started on port '));

app.get('/characters',(req,res)=> {
    mysql.pool.query('SELECT * FROM cs340_davicarr.Character',(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
        //context.results = JSON.stringify(rows);
    })
});

 /**
   * GET ID AND TYPE NAME FROM TYPE TABLE
   * TO USE IN FILTER
   */
app.get('/types',(req,res)=> {
    mysql.pool.query('SELECT id, type_name FROM cs340_davicarr.Type',(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
        //context.results = JSON.stringify(rows);
    })
});


// GET Type return name of type based on id selection 
//WE REALLY DONT NEED THIS JUST KEPT FOR EXAMPLE
app.get('/type/:id',function(req,res){
    var context = {};
    mysql.pool.query("SELECT id, type_name FROM cs340_davicarr.Type WHERE id=?", [req.params.id],(err, rows,fields)=>{
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




