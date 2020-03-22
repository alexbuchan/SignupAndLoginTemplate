const mysql = require('mysql2');
const Config = require('./config.js');

const onDatabases = (environments, action) => {
  environments.forEach((env) => {
    const { database } = Config[env];
    const connection = mysql.createConnection({
      host: Config[env].host,
      user: Config[env].username,
      password: Config[env].password,
    });

    action(connection, database);
  });
};

const dropDatabase = (connection, database) => {
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

const createDatabase = (connection, database) => {
  connection.connect((err) => {
    if (err) throw err;

    connection.query(`CREATE DATABASE ${database}`, () => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log(`Database ${database} created`);
      connection.end();
    });
  });
};

module.exports = {
  dbHelper: {
    onDatabases,
    dropDatabase,
    createDatabase,
  },
};