const express = require('express');
const router = express.Router();
const RecipesController = require('../controllers/recipes_controller');
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

router.get('/', RecipesController.index);

// CREATE ROUTE

router.post('/', 
    helpers.isLoggedIn,
    RecipesController.create
);

// NEW ROUTE

router.get('/new',
    helpers.isLoggedIn,
    RecipesController.new
);

// SHOW ROUTE

router.get('/:recipeId', RecipesController.show);

// EDIT ROUTE

router.get('/:recipeId/edit', 
    helpers.isLoggedIn,
    (req, res, next) => {
        Recipe.findById( req.params.recipeId )
            .then( foundRecipe => {
                res.render('edit', { recipe: foundRecipe });
            })
            .catch( err => {
                next(err);
            });
});

// UPDATE ROUTE

router.put('/:recipeId',
    helpers.isLoggedIn,
    (req, res, next) => {
        let trimmedBody = helpers.trimReqBody( req.body );
        Recipe.findByIdAndUpdate(
            req.params.recipeId,
            trimmedBody,
            { 
                new: true,
                runValidators: true
            })
            .populate('author')
            .then( updatedRecipe => {
                res.flash('success', 'Your edit has been saved.');
                res.render('show', { recipe: updatedRecipe });
            })
            .catch( err => {
                if(err.name === 'ValidationError'){
                    req.flash('error', err.message);
                    res.redirect(`/recipes/${req.path}/edit`);
                } else {
                    next(err);
                }
            });
    }
);

// DESTROY ROUTE

router.delete('/:recipeId',
    helpers.isLoggedIn,
    (req, res, err) => {
        Recipe.findByIdAndRemove( req.params.recipeId )
            .then( data => {
                req.flash('success', 'Recipe successfully deleted.')
                res.redirect('/recipes');
            })
            .catch( err => {
                next(err);
            });
});

module.exports = router;