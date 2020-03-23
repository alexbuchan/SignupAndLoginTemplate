const { dbHelper } = require('./dbHelperFunctions');
const env = process.env.NODE_ENV;

const ENVIRONMENTS = dbHelper.whichEnvironment(env);

dbHelper.onDatabases(ENVIRONMENTS, dbHelper.createDatabase);
