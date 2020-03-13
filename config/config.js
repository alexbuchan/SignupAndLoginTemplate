module.exports = {
  development: {
    username: 'root',
    password: 'admin',
    database: 'login_jwt_template_development',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false,
    port: 3306,
  },
  test: {
    username: 'root',
    password: 'admin',
    database: 'login_jwt_template_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false,
  },
  production: {
    username: 'root',
    password: 'admin',
    database: 'login_jwt_template_production',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false,
  },
};
