var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://nodedev:nodedev@localhost:5432/linkbase';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE link_base (id SERIAL PRIMARY KEY, link1 text not null, link2 text not null,link3 text not null, link4 text not null,link5 text not null)');
query.on('end', function() { client.end(); });