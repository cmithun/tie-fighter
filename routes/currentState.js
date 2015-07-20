var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://nodedev:nodedev@localhost:5432/linkbase';

module.exports = router;

//--------------------------------------------Read State!!----------------------------------------//
// There exists a way to do this in ONE query, this is homework
router.get('/', function(req, res) {

    var results = [];
    var results2 = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM current_state ORDER BY id ASC LIMIT 1;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // TODO: This is a hack, fix it
        query.on('end', function() {
            var query2 = client.query("SELECT * FROM link_base WHERE brandname iLIKE ($1) LIMIT 1", [results[0].state]); 

            query2.on('row', function(row) {
                results2.push(row);
            });

            query2.on('end', function() {
                client.end();
                return res.json(results2[0])
            });
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });

});

//--------------------------------------------Update State----------------------------------------//

router.put('/',function(req, res) {
    var data = {state: req.body.state};

    console.log(data);

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Update Data //Figure out how to put our variable state into our database entry state
        client.query("UPDATE current_state SET state=($1) RETURNING *", [data.state], function(err, results) {
            done();

            if(err) {
                console.log(err);
            }
            console.log(results);
            console.log(results.rows[0]);

            return res.json(results.rows[0]);
        });

        // After all data is returned, close connection and DO NOT return results
        

    });
});