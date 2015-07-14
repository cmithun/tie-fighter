var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://nodedev:nodedev@localhost:5432/linkbase';

module.exports = router;

//--------------------------------------------Read State!!----------------------------------------//

router.get('/', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM current_state ORDER BY id ASC LIMIT 1;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results[0]);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });

});