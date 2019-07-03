var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_davicarr',
  password        : '5388',
  database        : 'cs340_davicarr',
});

module.exports.pool = pool;
