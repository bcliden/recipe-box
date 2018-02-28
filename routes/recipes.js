const express = require('express');
const router = express.Router();
const db = require('../models');
const seedRecipes = require('../seedRecipes');

router.get('/', (req, res) => {
    res.redirect('/recipes');
});

router.get('/recipes', (req, res) => {
    res.render('index', { recipes: seedRecipes });
});

router.post('/recipes', (req, res) => {
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
});

router.get('/new', (req, res) => {
    res.render('new');
});

module.exports = router;