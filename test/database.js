const assert = require('assert');
const User = require('../models/user');
const Recipe = require('../models/recipe');
const mongoose = require('mongoose');


describe('User', function(){
    it('is sufficiently cleared between tests', function(done){
        User.find({})
            .then( users => {
                assert( users.length === 0 );
                done();
            })
            .catch( err => console.warn( err ));
    });
    it('registers a user', function(done){
        User.register({username: 'bob'}, '123456')
            .then( () => {
                return User.findOne({username: 'bob'});
            })
            .then( user => {
                assert( user.username === 'bob');
                done();
            })
            .catch( err => console.warn(err));
    });
    it('authenticates a registered user', function(done){
        this.timeout(4000);
        User.register({username: 'bob'}, '123456')
            .then( record => {
                return record.authenticate('123456');
            })
            .then( data => {
                assert( data.user != false );
                assert( data.user.username === 'bob');
                done();
            })
            .catch( err => console.warn(err));
    });
    it('does not authenticate an incorrect password', function(done){
        this.timeout(4000);
        User.register({username: 'bob'}, '123456')
            .then( record => {
                return record.authenticate('badpassword');
            })
            .then( data => {
                assert( data.user === false );
                done();
            })
            .catch( err => console.warn(err));
    })
})
