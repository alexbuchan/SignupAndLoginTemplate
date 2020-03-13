const mysql = require('mysql2');
const Config = require('./config.js');

const ENVIRONMENTS = Object.keys(Config);

const createDatabases = (connection, database) => {
  connection.connect((err) => {
    if (err) throw err;

    connection.query(`DROP DATABASE ${database}`, () => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log(`Database ${database} dropped.`);
      connection.end();
    });
  });
};

ENVIRONMENTS.forEach((env) => {
  const { database } = Config[env];
  const connection = mysql.createConnection({
    host: Config[env].host,
    user: Config[env].username,
    password: Config[env].password,
  });

  createDatabases(connection, database);
});