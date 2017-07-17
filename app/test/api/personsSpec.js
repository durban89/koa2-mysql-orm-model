const request = require('supertest');
const should = require('should');
const index = require('../../index');

const app = request(index.listen());

describe('/api/persons', () => {
  let personId;
  let childrenId;
  let movieId;

  it('POST / - create person success and respond with 200', (done) => {
    app.post('/api/persons')
      .send({
        firstName: 'Jennifer',
        lastName: 'Lawrence',
        age: 24,
      })
      .expect(200)
      .expect((res) => {
        (res.body.id > 0).should.be.true;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        const resJson = JSON.parse(res.text);
        personId = resJson.id;

        done();
      });
  });

  it('POST /:id/children - create children for person', (done) => {
    app.post(`/api/persons/${personId}/children`)
      .send({
        firstName: 'Sage',
        lastName: 'Stallone',
        age: 12,
      })
      .expect(200)
      .expect((res) => {
        (res.body.parentId > 0).should.be.true;
        childrenId = res.body.id;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

  it('POST /:id/pets - create pets for person', (done) => {
    app.post(`/api/persons/${personId}/pets`)
      .send({
        name: 'Coco',
        species: 'dog',
      })
      .expect(200)
      .expect((res) => {
        (res.body.ownerId == personId).should.be.true;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

  it('POST /:id/movies - create movies for person', (done) => {
    const movieName = 'Silver Linings Playbook';

    app.post(`/api/persons/${personId}/movies`)
      .send({
        name: movieName,
      })
      .expect(200)
      .expect((res) => {
        (res.body.name == movieName).should.be.true;
        movieId = res.body.id;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

  it('POST /movies/:id/actors - create actors fro movies', (done) => {
    app.post(`/api/movies/${movieId}/actors`)
      .send({
        id: childrenId,
      })
      .expect(200)
      .expect((res) => {
        (res.body.id == childrenId).should.be.true;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

  it('GET /movies/:id/actors - get actors of movie', (done) => {
    app.get(`/api/movies/${movieId}/actors`)
      .expect(200)
      .expect((res) => {
        (res.body.length > 0).should.be.true;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

  it('GET /:id/pets - fetch pets of person', (done) => {
    app.get(`/api/persons/${personId}/pets`)
      .expect(200)
      .expect((res) => {
        (res.body.length > 0).should.be.true;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

  it('GET / - fetch persons item', (done) => {
    app.get('/api/persons')
      .expect(200)
      .expect((res) => {
        (res.body.length > 0).should.be.true;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

  it('GET /:id - fetch a person', (done) => {
    app.get(`/api/persons/${personId}`)
      .expect(200)
      .expect((res) => {
        (res.body.id == personId).should.be.true;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

  it('DELETE /:id - delete a person', (done) => {
    app.delete(`/api/persons/${personId}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

  it('GET /:id - fetch a person should 404', (done) => {
    app.get(`/api/persons/${personId}`)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });
});
