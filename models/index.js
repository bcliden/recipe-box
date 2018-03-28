const mongoose = require('mongoose');
const uri = 'mongodb://localhost/recipe-box';

mongoose.Promise = global.Promise;
// mongoose.set('debug', true);

mongoose.connect(uri);

mongoose.connection
    .once('open', () => console.log('DB connected successfully to:', uri))
    .on('error', (err) => {
        console.error('DB error:', err.message);
        process.exit(1);
        // exitCode is supposed to be friendlier, but didn't work on drop in
        // process.exitCode = 1;
    })
    .on('disconnected', () => {
        console.error('DB disconnected from:', uri);
        process.exit(1);
    })

module.exports.Recipe = require('./recipe');
module.exports.User = require('./user');