const express = require('express');
const router = express.Router();
const db = require('../models');
const Recipe = db.Recipe;
const helpers = require('../helpers');
const passport = require('passport');

// hacky way to make DELETE request with the SHOW route <a> tag
router.use('/:recipeId', ( req, res, next ) => {
    if ( req.query._method == 'DELETE' ) {
        req.method = 'DELETE';
        req.url = req.path;
    }
    next();
});

// INDEX ROUTE

router.get('/', (req, res) => {
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

router.post('/', 
    helpers.isLoggedIn,
    (req, res) => {
        let trimmedBody = helpers.trimReqBody(req.body);
        let newRecipe = new Recipe( trimmedBody );
        newRecipe.validate(function(err){
            if(err){
                req.flash('error', err.message);
                res.render('new', { recipe: req.body });
            } else {
                newRecipe.save()
                    .then( () => {
                        req.flash('success', 'Recipe added')
                        res.redirect('/recipes');
                    })
                    .catch( err => {
                        console.error(err);
                        res.render('error', {error: err, message: err.message});
                    });
            }
        })
    });

// NEW ROUTE

router.get('/new',
    helpers.isLoggedIn,
    (req, res) => {
        res.render('new', {recipe: {}});
});

// SHOW ROUTE

router.get('/:recipeId', (req, res) => {
    Recipe.findById( req.params.recipeId )
        .then( foundRecipe => {
            res.render('show', { recipe: foundRecipe });
        })
        .catch( err => {
            console.error(err.message);
            res.status(404).render('/error')
        });
});

// EDIT ROUTE

router.get('/:recipeId/edit', 
    helpers.isLoggedIn,
    (req, res) => {
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

router.put('/:recipeId',
    helpers.isLoggedIn,
    (req, res) => {
        let trimmedBody = helpers.trimReqBody( req.body );
        Recipe.findByIdAndUpdate(
            req.params.recipeId,
            trimmedBody,
            { 
                new: true,
                runValidators: true
            })
            .then( updatedRecipe => {
                res.flash('success', 'Your edit has been saved.');
                res.render('show', { recipe: updatedRecipe });
            })
            .catch( err => {
                if(err.name === 'ValidationError'){
                    req.flash('error', err.message);
                    res.redirect(`/recipes/${req.path}/edit`);
                } else {
                    console.error(err.message);
                    res.render('error', { error: err, message: err.message });
                }
            });
    }
);

// DESTROY ROUTE

router.delete('/:recipeId',
    helpers.isLoggedIn,
    (req, res) => {
        Recipe.findByIdAndRemove( req.params.recipeId )
            .then( data => {
                req.flash('success', 'Recipe successfully deleted.')
                res.redirect('/recipes');
            })
            .catch( err => {
                console.error(err.message);
                res.redirect('/error');
            });
});

module.exports = router;