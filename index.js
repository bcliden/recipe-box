const express = require('express');
const app = express();
const ejs = require('ejs');
const methodOverride = require('method-override');
const recipeRoutes = require('./routes/recipes');

// EXPRESS CONFIG
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// PASSPORT CONFIG

// ROUTING
app.use('/', recipeRoutes);

// SERVER CONFIG
const port = process.env.port || 7575;
app.listen(port, () => {
    console.log('The app is running on port ', port)
});