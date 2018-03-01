const express = require('express');
const router = express.Router();
const db = require('../models');
const Recipe = db.Recipe;
const seedRecipes = require('../seedRecipes');

router.get('/', (req, res) => {
    res.redirect('/recipes');
});

router.get('/recipes', (req, res) => {
    Recipe.find({})
        .then( foundRecipes => {
            res.render('index', { recipes: foundRecipes });
        })
        .catch( err => console.err(err));
});

router.post('/recipes', (req, res) => {
    let { title, author, description, ingredients, steps } = req.body;
    ingredients = ingredients.filter(recipe => recipe.trim().length > 0);
    steps = steps.filter(step => step.trim().length > 0);

    Recipe.create({
        title,
        author,
        description,
        ingredients,
        steps
    })
        .then( () => res.redirect('/recipes') )
        .catch( err => console.err(err) );
});

router.get('/new', (req, res) => {
    res.render('new');
});

router.get('/recipes/:recipeId', (req, res) => {
    Recipe.findOne({ _id: req.params.recipeId })
        .then( foundRecipe => {
            res.render('show', { recipe: foundRecipe });
        })
        .catch( err => console.err(err));
});

module.exports = router;