const mongoose = require('mongoose');
const uri = 'mongodb://localhost/recipe-box';

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

mongoose.connect(uri);
mongoose.connection
    .on('error', (err) => {
        console.error.bind(console, 'Connection error:');
    })
    .once('open', () => {
        console.log('DB connected successfully.');
    });

module.exports.Recipe = require('./recipe');