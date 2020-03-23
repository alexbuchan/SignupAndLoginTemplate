const models = require('../models');

const clearDB = async () => {
  return Promise.all(
    Object.keys(models).map((key) => {
      if (['sequelize', 'Sequelize'].includes(key)) {
        return null;
      }

      return models[key].destroy({ where: {}, force: true });
    }),
  );
};

module.exports = {
  testSetup: {
    clearDB,
  },
};
