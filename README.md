This is a Express.js API template I wrote with signup, login, and GET /contacts routes that are authenticated with passport and JWT.
I have a matching repository which contains the frontend here: [SignupAndLoginTemplateUI](https://github.com/alexbuchan/SignupAndLoginTemplateUI)

This project is meant to help me learn how to write an Express.js API with authentication, which I can then turn into real applications.

# Dependencies

* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [Passport.js](http://www.passportjs.org/)
* [Sequelize](https://sequelize.org/)
* [MySQL](https://www.mysql.com/)
* [Mocha](https://mochajs.org/)
* [Chai](https://www.chaijs.com/)

# Setup

## Download the repository:

`git clone git@github.com:alexbuchan/SignupAndLoginTemplate.git`

## Install the dependencies:

`npm install`

## Setup the database:

This project uses mysql2 library as a database, and Sequelize as an ORM. Make sure you have mysql set up and installed on your computer.
This project has scripts that run in a similar style to a rake task from Ruby on Rails.

### To create the database:

`npm run db:create`

### To drop the database:

`npm run db:drop`

### To migrate run:

`npm run db:migrate`

Note that these scripts will only affect the development environment by default unless an environment variable is added 
(example: `NODE_ENV=test npm run db:migrate`)

## To run the project:

`npm start`

Make sure you add an .env file to your project which contains an environment variable called ACCESS_TOKEN_SECRET equal to a randomly generated string.
This will be used by JWT to generate a token.

```
// .env
ACCESS_TOKEN_SECRET=fbdshablfghsdlafghsdvafldhsladvfd
```

## To run the tests:

The tests run with Mocha and Chai libraries, and are found in the `test` folder.
To run all the tests:

`npm test test/*`

To run tests within a folder:

`npm test test/integration`

Or a specific file:

`npm test test/integration/user_spec.js`
