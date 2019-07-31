

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
// var mysql = require('./dbcon.js');
var pool = mysql.createPool({
  connectionLimit : 10,  
  host : 'classmysql.engr.oregonstate.edu',
  user : 'cs340_turnesar',
  password : '0038',
  database : 'cs340_turnesar' 
});

 /**
   * GLOBAL VARIABLE FOR DATABASE UPDATE DATABASE HERE
   */
 //const D = 'cs340_davicarr.';


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


  /**  CHARACTER QUERIES ****************************
   * GET ALL CHARACTER FROM CHARACTER TABLE WITH JOINS
   * SELECT QUERY
   */
app.get('/character',(req,res)=> {
    var char_sql = "SELECT Character.name, Type.type_name AS type, Group.group_name AS group, Character.gender,
     City.city_name AS city FROM Character INNER JOIN Type ON Character.type_id = Type.id 
    INNER JOIN Group ON Character.group_id = Group.id INNER JOIN City ON Character.city_id = City.id ORDER BY name";   
    pool.query(char_sql,(err,rows,result,fields)=>{
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
   * GET ID AND CHARACTER NAME FROM CHARACTER TABLE
   * TO USE IN FILTER - SELECT QUERY
   */
  app.get('/characterID',(req,res)=> {
    pool.query('SELECT id, name FROM Character',(err,rows,result,fields)=>{
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
   * PLACEHOLDER FOR INSERT CHARACTER 
 */

 /**
   * PLACEHOLDER FOR UPDATE CHARACTER
   */

   /**
   * PLACEHOLDER FOR DELETE CHARACTER
   */
  
   
 /**JOB QUERIES**********************************
   * GET ALL FROM JOB TABLE
   *  SELECT QUERY 
   */
  app.get('/job',(req,res)=> {
    var job_sql = "SELECT Job.job_name AS Name, Type.type_name AS Type FROM 
    Job INNER JOIN Type ON Job.type_id = Type.id ORDER BY name";
    pool.query(job_sql ,(err,rows,result,fields)=>{
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
   * GET name/id JOB TABLE
   * Use in Filter SELECT QUERY
   */
  app.get('/jobID',(req,res)=> {
    pool.query('SELECT id, job_name FROM Job',(err,rows,result,fields)=>{
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
  * PLACEHOLDER INSERT JOB 
   */


 /**TYPE QUERIES******************************
   * GET FULL TYPE TABLE
   * SELECT QUERY 
   */
  app.get('/type',(req,res)=> {
    pool.query('SELECT * FROM Type',(err,rows,result,fields)=>{
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
   * GET name/id Type TABLE
   * SELECT QUERY
   */
app.get('/typeID',(req,res)=> {
    pool.query('SELECT id, type_name FROM Type',(err,rows,result,fields)=>{
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
   * PLACEHOLDER INSERT TYPES 
   */

 /**CITY QUERIES******************************
   * GET FULL CITY TABLE
   * SELECT QUERY 
   */
  app.get('/city',(req,res)=> {
    pool.query('SELECT * FROM City',(err,rows,result,fields)=>{
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
   * GET name/id City TABLE
   * SELECT QUERY
   */
app.get('/cityID',(req,res)=> {
    pool.query('SELECT id, city_name FROM City',(err,rows,result,fields)=>{
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
   * PLACEHOLDER INSERT CITY 
   */

/**GROUP QUERIES**********************************
   * GET ALL FROM GROUP TABLE
   * SELECT QUERY 
   */
  app.get('/group',(req,res)=> {
    var group_sql = "SELECT Group.group_name AS Name, City.city_name AS City FROM 
    Group INNER JOIN City ON Group.city_id = City.id ORDER BY name";
    pool.query(group_sql ,(err,rows,result,fields)=>{
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
   * GET name/id group TABLE
   * SELECT QUERY
   */
  app.get('/groupID',(req,res)=> {
    pool.query('SELECT id, group_name FROM Group',(err,rows,result,fields)=>{
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
  * PLACEHOLDER INSERT Group 
   */

/*END OF ENTITY TABLES, NOW RELATIONSHIPS*/

/***Character_Job Queries *****************************
  *Show all for table
  * SELECT QUERY
   */
  app.get('/character_job',(req,res)=> {
    var ponywork_sql = "SELECT Character.name AS Name, Job.job_name AS Job FROM 
    Character_Job INNER JOIN Character ON character.id = Character_Job.character_id INNER JOIN 
    Job ON Character_Job.job_id =  Job.id ORDER BY name";
    pool.query(ponywork_sql ,(err,rows,result,fields)=>{
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

/***** PLACEHOLDER FOR CREATE RELATIONSHIP/INSERT */

/***** PLACEHOLDER FOR DELETE RELATIONSHIP */

// GET Type return name of type based on id selection 
//WE REALLY DONT NEED THIS JUST KEPT FOR EXAMPLE
app.get('/type/:id',function(req,res){
    var context = {};
    pool.query('SELECT id, type_name FROM Type WHERE id=?', [req.params.id],(err, rows,fields)=>{
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




