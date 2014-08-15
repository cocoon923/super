var mysql = require('mysql');
var selectSQL = 'SELECT place_name, b.`name`, b.bDate, b.remark FROM supperplace a, supper b WHERE a.place_id = b.place and b.bDate = ? ORDER BY bDate, place_name;';

module.exports = function (dbpool, dates, result) {
    var pool = mysql.createPool(dbpool);
    pool.getConnection(function (err, conn) {
        if (err) console.log("POOL ==> " + err);
        console.log(conn == null);
        conn.query(selectSQL, [dates], function (err, rows) {
            if (err) console.log(err);
            for (var i in rows) {
                console.log(rows[i]);
            }
            conn.release();
            result(rows);
        });
    });
}

