const express = require('express');
const ejs = require('ejs');

const seedRecipes = [
    {
        title: 'Pear brandy',
        author: 'Benjamin Liden',
        description: 'A very tasty pear brandy! Of roman and scotch heritage. What a mystery.'
    },
    {
        title: 'Lemon wedges',
        author: 'Medieval Man',
        description: 'it\'s sugared lemon wedges. big surprise.'
    },
    {
        title: 'Mac \'n\' Cheese',
        author: 'Bridget Sellers',
        description: 'All I know is pain. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni voluptatibus dolorum alias repellendus culpa, quam unde id velit. Sint, consequatur!'
    },
    {
        title: 'Pot of Rice, perfect',
        author: 'Bon Appetit',
        description: 'Literally the most perfect pot of rice. Honed after several decades.'
    }
]

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.redirect('/recipes');
});

app.get('/recipes', (req, res) => {
    res.render('index', { recipes: seedRecipes });
});

app.post('/recipes', (req, res) => {
    let { title, author, description, ingredients, steps } = req.body;
    ingredients = ingredients.filter(recipe => recipe.trim().length > 0);
    steps = steps.filter(step => step.trim().length > 0);
    const newRecipe = {
        title,
        author,
        description,
        ingredients,
        steps
    };
    console.log(newRecipe);
    res.redirect('/recipes');
})

app.get('/new', (req, res) => {
    res.render('new');
})

const port = process.env.port || 7575;
app.listen(port, () => {
    console.log('The app is running on port ', port)
});