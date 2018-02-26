const express = require('express');
const ejs = require('ejs');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.redirect('/recipes');
});

app.get('/recipes', (req, res) => {
    res.render('index');
});

app.post('/recipes', (req, res) => {
    res.send('this is the post rt');
})

app.get('/new', (req, res) => {
    res.render('new');
})

const port = process.env.port || 7575;
app.listen(port, () => {
    console.log('The app is running on port ', port)
});