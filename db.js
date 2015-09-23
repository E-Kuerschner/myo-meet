var mysql = require('mysql');

var init_connection = function(){
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'Erich',
		password: 'kuersch4',
		database: 'node_project'
	});
}

var runQuery = function(query){
	connection.connect();
	connection.query(query, function(err, rows, fields){
		if(err) throw err;
		console.log(rows[0]);
	});
	connection.end();
}

module.exports = {
	init_localhost_conn: init_connection,
	runQuery: runQuery
};