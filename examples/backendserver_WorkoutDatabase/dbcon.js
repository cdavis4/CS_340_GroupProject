var mysql = require('mysql');
var pool = mysql.createPool({
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_davicarr',
  password        : '5388',
  database        : 'cs290_davicarr',
  dateStrings     : 'date'
});

module.exports.pool = pool;