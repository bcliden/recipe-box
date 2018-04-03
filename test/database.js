const assert = require('assert');
const User = require('../models/user');
const Recipe = require('../models/recipe');


describe('works with users', () => {
    it('registers a user', (done) => {
        User.register({username: 'bob'}, '123456')
            .then( () => {
                User.findOne({username: 'bob'})
                    .then( user => {
                        assert( user.username === 'bob');
                        done();
                    })
                    .catch( err => console.warn(err));
            })
            .catch( err => console.warn(err));
    });
    it('is sufficiently cleared between tests', (done) => {
        User.find({})
            .then( users => {
                assert( users.length === 0 );
                done();
            })
            .catch( err => console.warn( err ));
    });
})
