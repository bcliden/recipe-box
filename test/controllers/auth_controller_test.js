const assert = require('assert');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');

const User = mongoose.model('user');

describe('Authentication Controllers', () => {
    it('Registers a user', (done) => {
        User.count().then( count => {
            request(app)
                .post('/register')
                .send({username: 'test', password:'123456'})
                .end( (err, res) => {
                    if(err){ return done(err) };
                    User.count().then( newCount => {
                        assert( count + 1 === newCount);
                        done();
                    })
                    .catch( err => done(err))
                })
        }).catch( err => console.error(err))
    });
    it('Will not register an incomplete request', (done) => {
        User.count().then( count => {
            request(app)
                .post('/register')
                .send({username: 'test'})
                .end( (err, res) => {
                    if(err){ return done(err) };
                    User.count().then( newCount => {
                        assert( count === newCount);
                        done();
                    })
                    .catch( err => done(err));
                })
        }).catch( err => console.error(err))
    });
    it('Logs in a user', function(done) {
        User.register({username: 'test'}, '123456')
            .then( () => {
                request(app)
                    .post('/login')
                    .send({username: 'test', password: '123456'})
                    .expect(302)
                    .expect('Location', '/recipes', done)
            })
    });
    it('Does not log in a bad password', function(done) {
        User.register({username: 'test'}, '123456')
            .then( () => {
                request(app)
                    .post('/login')
                    .send({username: 'test', password: 'badpwd'})
                    .expect(302)
                    .expect('Location', '/login', done)
            })
    });
    it('Does not log in a bad username', function(done) {
        User.register({username: 'test'}, '123456')
            .then( () => {
                request(app)
                    .post('/login')
                    .send({username: 'badusr', password: '123456'})
                    .expect(302)
                    .expect('Location', '/login', done)
            })
    });
})