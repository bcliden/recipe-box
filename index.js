const express = require('express');
const app = express();
const ejs = require('ejs');
const methodOverride = require('method-override');
const recipeRoutes = require('./routes/recipes');

app.use(express.urlencoded({ extended: true }));

// hacky way to make DELETE request with the SHOW route <a> tag
app.use('/recipes/:recipeId', ( req, res, next ) => {
    if ( req.query._method == 'DELETE' ) {
        req.method = 'DELETE';
        req.url = req.path;
    }       
    next(); 
});

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/', recipeRoutes);

const port = process.env.port || 7575;
app.listen(port, () => {
    console.log('The app is running on port ', port)
});