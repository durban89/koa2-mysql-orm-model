const request = require('supertest');
const should = require('should');
const index = require('../../index');

let app = request(index.listen());

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

  it('POST /api/persons/:id/children - create children for person', function(done) {
    app.post(`/api/persons/${personId}/children`)
      .send({
        'firstName': 'Sage',
        'lastName': 'Stallone',
        'age': 12
      })
      .expect(200)
      .expect(function(res) {
        (res.body.parentId > 0).should.be.true;
      })
      .end(function(err, res) {
        if (err) {
          return done(err);
        }

        done();
      })
  });

  it('POST /api/persons/:id/pets create pets for person', function(done) {
    app.post(`/api/persons/${personId}/pets`)
      .send({
        "name": "Coco",
        "species": "dog"
      })
      .expect(200)
      .expect(function(res) {
        (res.body.ownerId == personId).should.be.true;
      })
      .end(function(err, res) {
        if (err) {
          console.log(err.stack);
          return done(err);
        }

        done();
      })
  })

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
