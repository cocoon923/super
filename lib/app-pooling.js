var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'ailife',
    password: 'ailife',
    database: 'cf',
    port: 3306
});

var selectSQL = 'SELECT place_name, b.`name`, b.bDate, b.remark FROM supperplace a, supper b WHERE a.place_id = b.place and b.bDate = ? ORDER BY bDate, place_name;';

module.exports = function (dates, result){
pool.getConnection(function (err, conn) {
    if (err) console.log("POOL ==> " + err);

    conn.query(selectSQL, [dates], function(err,rows){
        if (err) console.log(err);
        conn.release();
	result(rows);
    });
});
return result;
}

