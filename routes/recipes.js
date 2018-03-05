const express = require('express');
const router = express.Router();
const db = require('../models');
const Recipe = db.Recipe;
const helpers = require('../helpers');

// BASE DIR

router.get('/', (req, res) => {
    res.redirect('/recipes');
});

// INDEX ROUTE

router.get('/recipes', (req, res) => {
    Recipe.find({})
        .then( foundRecipes => {
            res.render('index', { recipes: foundRecipes });
        })
        .catch( err => {
            console.error(err.message);
            res.render('error');
        });
});

// CREATE ROUTE

router.post('/recipes', (req, res) => {

    Recipe.create( helpers.trimReqBody(req.body) )
    // let { title, author, description, ingredients, steps } = req.body;
    // ingredients = ingredients.filter(recipe => recipe.trim().length > 0);
    // steps = steps.filter(step => step.trim().length > 0);

    // Recipe.create({
    //     title,
    //     author,
    //     description,
    //     ingredients,
    //     steps
    // })
        .then( () => res.redirect('/recipes') )
        .catch( err => console.error(err) );
});

// NEW ROUTE

router.get('/new', (req, res) => {
    res.render('new');
});

// SHOW ROUTE

router.get('/recipes/:recipeId', (req, res) => {
    Recipe.findById( req.params.recipeId )
        .then( foundRecipe => {
            res.render('show', { recipe: foundRecipe });
        })
        .catch( err => {
            console.error(err.message);
            res.render('error');
        });
});

// EDIT ROUTE

router.get('/recipes/:recipeId/edit', (req, res) => {
    Recipe.findById( req.params.recipeId )
        .then( foundRecipe => {
            res.render('edit', { recipe: foundRecipe });
        })
        .catch( err => {
            console.error(err.message);
            res.render('error');
        });
});

// UPDATE ROUTE

router.put('/recipes/:recipeId', (req, res) => {
    Recipe.findByIdAndUpdate( req.params.recipeId, helpers.trimReqBody(req.body) , { new: true })
        .then( updatedRecipe => {
            res.render('show', { recipe: updatedRecipe });
        })
        .catch( err => {
            console.error(err.message);
            res.render('error');
        });
});

// DESTROY ROUTE


// hacky way to make DELETE request with the SHOW route <a> tag
router.use('/recipes/:recipeId', ( req, res, next ) => {
    if ( req.query._method == 'DELETE' ) {
        req.method = 'DELETE';
        req.url = req.path;
    }
    next();
});

router.delete('/recipes/:recipeId', (req, res) => {
    Recipe.findByIdAndRemove( req.params.recipeId )
        .then( data => {
            console.log(data);
            res.redirect('/recipes');
        })
        .catch( err => {
            console.error(err.message);
            res.render('error');
        });
});

router.get('/*', (req, res) => {
    res.render('error');
});

module.exports = router;