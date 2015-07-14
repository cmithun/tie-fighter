var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://nodedev:nodedev@localhost:5432/linkbase';

module.exports = router;

//------------------------------------------Create-------------------------------------------//

router.post('/', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {text: req.body.text, complete: false};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Insert Data
        client.query("INSERT INTO link_base(link1, link2, link3, link4, link5) values($1, $2, $3, $4, $5)", [data.link1, data.link2, data.link3, data.link4, data.link5]); //$1 is first argument, $2 is second argument

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM link_base ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });
});

//------------------------------------------Read-------------------------------------------//

router.get('/', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM link_base ORDER BY id ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });

});



//------------------------------------------Update-------------------------------------------//

router.put('/:link_base_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.link_base_id;

    // Grab data from http request
    var data = {text: req.body.text, complete: req.body.complete};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Update Data
        client.query("UPDATE link_base SET link1=($1), link2=($2), link3 = ($3), link4 = ($4), link5 = ($5) WHERE id=($6)", [data.link1, data.link2, data.link3, data.link4, data.link5, id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM link_base ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });

});

//------------------------------------------Delete-------------------------------------------//

router.delete('/:link_base_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.link_base_id;


    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Delete Data
        client.query("DELETE FROM link_base WHERE id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM link_base ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });

});
