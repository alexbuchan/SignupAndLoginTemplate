const request = require('supertest');
const chai = require('chai');
const app = require('../../app');
const { testSetup } = require('../testSetup');

const { expect } = chai;

describe('ContactController', () => {
  describe('#getContacts', () => {
    describe('when user credentials are correct', () => {
      let token;
      
      beforeEach((done) => {
        request(app)
        .post('/signup')
        .send({
          username: 'User',
          email: 'user@email.com',
          password: 'password',
        })
        .end((err, response) => {
          console.log('response.body.token', response.body.token)
          token = response.body.token;
          done();
        });
      });
      
      afterEach(() => {
        testSetup.clearDB();
      });

      it('returns status 200 and response contains contacts', (done) => {
        console.log('token variable!', token);
        request(app)
          .get('/contacts')
          .set('Authorization', `Bearer ${token}`)
          .end((err, response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array').that.is.not.empty;
            done();
          });
      });
    });
  });
});
