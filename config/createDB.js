const Config = require('./config.js');
const { dbHelper } = require('./dbHelperFunctions');

const ENVIRONMENTS = Object.keys(Config);

dbHelper.onDatabases(ENVIRONMENTS, dbHelper.createDatabase);
