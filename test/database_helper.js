const mongoose = require('mongoose');
const uri = 'mongodb://localhost/recipe-box-test';

mongoose.connect(uri)
mongoose.connection
    .once('open', () => console.log('test DB connected at', uri))
    .on('error', (err) => console.error('error: ', err));

beforeEach( done => {
    const { users, recipes } = mongoose.connection.collections;
    users.drop( () => {
        recipes.drop( () => {
            done();
        })
    })
});

after( () => {
    const { users, recipes } = mongoose.connection.collections;
    users.drop( () => {
        recipes.drop( () => {
            mongoose.connection.close()
        })
    })
})