const Config = require('./config.js');
const mysql = require('mysql2');
const ENVIRONMENTS = Object.keys(Config);

const createDatabases = (connection, database) => {
  connection.connect(err => {
    if (err) throw err;
    
    connection.query(`CREATE DATABASE ${database}`, (err, result) => {
      if (err) throw err;
      console.log(`Database ${database} created`);
      connection.end();
    });
  });
};

ENVIRONMENTS.forEach(env => {
  let database = Config[env].database;
  let connection = mysql.createConnection({
    host: Config[env].host,
    user: Config[env].username,
    password: Config[env].password
  });

  createDatabases(connection, database);
});