const express = require('express');
const app = express();
const ejs = require('ejs');
const methodOverride = require('method-override');
const recipeRoutes = require('./routes/recipes');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/', recipeRoutes);

const port = process.env.port || 7575;
app.listen(port, () => {
    console.log('The app is running on port ', port)
});