var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://elximttdmryywf:Zcg0gq6R2fBIbIy9cWvveuMkn-@ec2-174-129-26-115.compute-1.amazonaws.com:5432';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE DATABASE linkbase WITH OWNER elximttdmryywf'); //Create postgres database called linkbase with Heroku generated owner name
query.on('end', function() { client.end(); });