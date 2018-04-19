const assert = require('assert');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');

const User = mongoose.model('user');

describe('Authentication Controllers', () => {
    it.only('Registers a user', (done) => {
        User.count().then( count => {
            request(app)
                .post('/register')
                .send({username: 'test', password:'123456'})
                .end( (err, res) => {
                    if(err){ return done(err) };
                    User.count().then( newCount => {
                        console.log(count, newCount);
                        assert( count + 1 === newCount);
                        done();
                    })
                })
        }).catch( err => console.error(err))
    })
})