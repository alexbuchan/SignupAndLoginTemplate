const request = require('supertest');
const chai = require('chai');
const app = require('../../../app');
const { testSetup } = require('../../testSetup');

const { expect } = chai;

describe('UserController', () => {
  describe('#signup', () => {
    afterEach(() => {
      testSetup.clearDB();
    });

    describe('when user attributes are correct', () => {
      it('return status 200 and response contains a jwt token', (done) => {
        request(app)
          .post('/signup')
          .send({
            username: 'User',
            email: 'user@email.com',
            password: 'password',
          })
          .end((err, response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.key('token');
            done();
          });
      });
    });

    describe('when user attributes are incorrect', () => {
      it('returns a validation error', (done) => {
        request(app)
          .post('/signup')
          .send({
            username: 'User',
            email: 'User',
            password: 'password',
          })
          .end((err, response) => {
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error[0]).to.have.keys('field', 'message');
            done();
          });
      });
    });

    describe('when user send no attributes', () => {
      it('returns missing credentials error', (done) => {
        request(app)
          .post('/signup')
          .end((err, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal('Missing credentials');
            done();
          });
      });
    });
  });

  describe('#login', () => {
    beforeEach((done) => {
      request(app)
        .post('/signup')
        .send({
          username: 'User',
          email: 'user@email.com',
          password: 'password',
        }).end(done);
    });

    afterEach(() => {
      testSetup.clearDB();
    });

    describe('when user credentials are authenticated', () => {
      it('return status 200 and response contains a jwt token', (done) => {
        request(app)
          .post('/login')
          .send({
            username: 'User',
            email: 'user@email.com',
            password: 'password',
          })
          .end((err, response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.key('token');
            done();
          });
      });
    });

    describe('when user attributes are incorrect', () => {
      it('returns a validation error', (done) => {
        request(app)
          .post('/login')
          .send({
            username: 'User',
            email: 'User',
            password: 'password',
          })
          .end((err, response) => {
            expect(response.status).to.equal(400);
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.equal('Email or password are incorrect.');
            done();
          });
      });
    });

    describe('when user send no attributes', () => {
      it('returns missing credentials error', (done) => {
        request(app)
          .post('/login')
          .end((err, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal('Missing credentials');
            done();
          });
      });
    });
  });
});
