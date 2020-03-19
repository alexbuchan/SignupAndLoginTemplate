const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 12;
const hashPassword = (password) => bcrypt.hash(password, BCRYPT_SALT_ROUNDS);


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username is required.',
        },
        len: {
          args: [3, 20],
          msg: 'Username length should be larger than 2 and smaller than 20 characters',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is required.',
        },
        len: {
          args: [6, 100],
          msg: 'Password length should be larger 6 characters',
        },
      },
    },
  }, {
    hooks: {
      afterValidate: async (user, options) => {
        user.password = await hashPassword(user.password);
      },
    },
  });
  return User;
};
