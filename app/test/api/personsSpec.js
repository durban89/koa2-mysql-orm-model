const request = require('supertest');
const should = require('should');

let app = request('http://127.0.0.1:8881');

describe('/api/persons', function() {
  let personId;

  it('POST /api/persons - create person success and respond with 200', function(done) {
    app.post('/api/persons')
      .send({
        'firstName': 'Jennifer',
        'lastName': 'Lawrence',
        'age': 24
      })
      .expect(200)
      .expect(function(res) {
        (res.body.id > 0).should.be.true;
      })
      .end(function(err, res) {
        if (err) {
          return done(err);
        }

        let resJson = JSON.parse(res.text);
        personId = resJson.id;

        done();
      })
  });

  it('GET /api/persons - fetch persons item', function(done) {
    app.get('/api/persons')
      .expect(200)
      .expect(function(res) {
        (res.body.length > 0).should.be.true;
      })
      .end(function(err, res) {
        if (err) {
          return done(err);
        }

        done();
      })
  });

  it('GET /api/persons/:id - fetch a person', function(done) {
    app.get(`/api/persons/${personId}`)
      .expect(200)
      .expect(function(res) {
        (res.body.id == personId).should.be.true;
      })
      .end(function(err, res) {
        if (err) {
          return done(err);
        }

        done();
      })
  });

  it('DELETE /api/persons/:id - delete a person', function(done) {
    app.delete(`/api/persons/${personId}`)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }

        done();
      })
  });

  it('GET /api/persons/:id - fetch a person should 404', function(done) {
    app.get(`/api/persons/${personId}`)
      .expect(404)
      .end(function(err, res) {
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
