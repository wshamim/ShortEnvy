//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let UrlModel = require('../models/url');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let config = require('config');
let should = chai.should();

let shortUrl = '';

chai.use(chaiHttp);

//Our parent block
describe('Urls', () => {
  beforeEach(done => {
    //Before each test we empty the database
    UrlModel.remove({}, err => {
      done();
    });
  });

  describe('/api/shorten URL', () => {
    it('it should Shorten a URL ', done => {
      let urlObj = { longUrl: 'http://www.google.com/' };

      chai
        .request(server)
        .post('/api/shorten')
        .send(urlObj)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('msg').eql('Url Shortened successfully.');
          res.body.should.have.property('shortUrl');
          res.body.should.have.property('longUrl');
          res.body.should.have.property('error');
          shortUrl = res.body.shortUrl;
          done();
        });
    });
  });

  describe('/:short_id UR:', () => {
    it('it should resolve a short url', done => {
      shortUrl = shortUrl.replace(config.WebserverHost, '');
      chai
        .request(server)
        .get('/')
        .send({ short_id: shortUrl })
        .end((err, res) => {
          res.should.have.status(200);
          res.header.should.have.property('content-type').eql('text/html; charset=UTF-8');
          done();
        });
    });
  });
});
