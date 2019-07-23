var express = require('express');

var app = express();
app.set('port', process.argv[2]);
//app.set('port', "5659");

var __dirname = 'http://localhost';

app.use(express.static('mylittlepony'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/data', express.static(__dirname + '/data'));

app.use(function(req,res){
    res.status(404);
    res.send('404 Error');
  });
  
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
  });

var server = app.listen(app.get('port'), function(){
    var port = server.address().port;
    console.log("Server started at " + __dirname + ": " + port);
});