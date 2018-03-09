const express = require('express');
const router = express.Router();
const db = require('../models');
const Recipe = db.Recipe;
const helpers = require('../helpers');

// INDEX ROUTE

router.get('/', (req, res) => {
    Recipe.find({})
        .then( foundRecipes => {
            res.render('index', { recipes: foundRecipes, user: req.user });
        })
        .catch( err => {
            console.error(err.message);
            res.render('error');
        });
});

// CREATE ROUTE

router.post('/', (req, res) => {
    Recipe.create( helpers.trimReqBody(req.body) )
        .then( () => res.redirect('/recipes') )
        .catch( err => console.error(err) );
});

// NEW ROUTE

router.get('/new', (req, res) => {
    res.render('new');
});

// SHOW ROUTE

router.get('/:recipeId', (req, res) => {
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

router.get('/:recipeId/edit', (req, res) => {
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

router.put('/:recipeId', (req, res) => {
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
router.use('/:recipeId', ( req, res, next ) => {
    if ( req.query._method == 'DELETE' ) {
        req.method = 'DELETE';
        req.url = req.path;
    }
    next();
});

router.delete('/:recipeId', (req, res) => {
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