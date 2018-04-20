const assert = require('assert');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');

const Recipe = mongoose.model('recipe');
const User = mongoose.model('user');

describe('Recipe Controllers', function(){
    describe('GET request to /recipes', function(){
        it('GET request to \'/\' redirects to /recipes', function(done){
            request(app)
                .get('/')
                .expect(302)
                .expect('Location', '/recipes', done)
        });
        it('GET request /recipes', function(done){
            request(app)
                .get('/recipes')
                .expect(200)
                // .expect('Location', '/recipes', done)
                .end(done)
        });
    });
    describe('POST request to /recipes', function(){
        it('must be logged in to create a recipe', function(done){
            request(app)
                .post('/recipes')
                .send({
                    title: 'testTitle',
                    description: 'testDesc',
                    steps: [
                        'testStep',
                        'testStep2'
                    ],
                    ingredients: [
                        'testIngred',
                        'testIngred2'
                    ],
                })
                .expect('Location', '/login')
                .end( (err, res) => {
                    if(err){ return done(err) };
                    done();
                })
        });
        // more research needed for supertest + session.
        // db tests should work fine.
        it('creates a recipe');
    });
})