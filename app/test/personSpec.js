const request = require('supertest');

let app = request('http://127.0.0.1:8881');

describe('GET /person', function() {
  it('respond with 200', function(done) {
    app.get('/person').expect(200).end(function(err, res) {
      if (err) {
        return done(err);
      }

      done();
    })
  });
});

describe('GET /person/:id', function() {
  it('respond with 200', function(done) {
    app.get('/person/2').expect(200).end(function(err, res) {
      if (err) {
        return done(err);
      }

      done();
    })
  });
});
