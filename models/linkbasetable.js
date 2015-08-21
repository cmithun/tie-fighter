var pg = require('pg'); //Require postgres library
var connectionString = process.env.DATABASE_URL || 'postgres://elximttdmryywf:Zcg0gq6R2fBIbIy9cWvveuMkn-@ec2-174-129-26-115.compute-1.amazonaws.com:5432/d5pkqb2eupci9e'; //Connection string to postgres database

var client = new pg.Client(connectionString); 
client.connect(); //connect to postgres DB
var query = client.query('CREATE TABLE link_base (id SERIAL PRIMARY KEY, link1 text not null, link2 text not null,link3 text not null, link4 text not null,link5 text not null)'); //Create a table to store hyperlinks. Hyperlinks are served to presenter CPUs. 
query.on('end', function() { client.end(); });

