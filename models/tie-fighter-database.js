var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://nodedev:nodedev@localhost:5432';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE DATABASE linkbase WITH OWNER nodedev');
query.on('end', function() { client.end(); });