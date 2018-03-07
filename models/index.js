const mongoose = require('mongoose');
const uri = 'mongodb://localhost/recipe-box';

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

mongoose.connect(uri)
    .catch(err => console.error(err.message));
mongoose.connection
    .on('error', (err) => {
        console.error.bind(console, 'Connection error:');
    })
    .once('open', () => {
        console.log('DB connected successfully.');
    })
    .catch(err => console.error(err.message));

module.exports.Recipe = require('./recipe');
module.exports.User = require('./user');