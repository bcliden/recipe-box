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
    debugger;
    let size = parseInt(req.query.size || 10);
    let page = parseInt(req.query.page || 0);
    let entries = page * size;

    let count, range, max, back, forward, last;
    Recipe.count({})
    .then( (c) => {
        count = c;
        (page*size+size > count) ? max = count : max = page*size+size
        range = `${page*size+1} - ${max} of ${count}`;
        last = Math.floor((count-1)/size);
        (page-1 >= 0) ? back = page-1 : back = 0;
        (page+1 <= last) ? forward = page+1 : forward = last;
    })
    .then( () => {
        Recipe.find({})
            .skip(entries)
            .limit(size)
            .then( foundRecipes => {
                res.render('index', 
                    { 
                        recipes: foundRecipes,
                        page: {
                            range,
                            forward,
                            back,
                            last,
                        }
                    }
                );
            })
            .catch( err => {
                console.error(err.message);
                res.render('error');
            });
    })
    .catch( err => console.error(err));
});

// CREATE ROUTE

router.post('/', 
    helpers.isLoggedIn,
    (req, res) => {
        let trimmedBody = helpers.trimReqBody(req.body);
        trimmedBody.author = req.user.username;
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
        res.render('new', {recipe: null});
});

// SHOW ROUTE

router.get('/:recipeId', (req, res) => {
    Recipe.findById( req.params.recipeId )
        .then( foundRecipe => {
            res.render('show', { recipe: foundRecipe });
        })
        .catch( err => {
            console.error(err.message);
            res.render('error', { error: err, message: err.message });
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
                res.render('error', { error: err, message: err.message });
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

// SEARCH ROUTE

router.get('/search', (req, res) => {
    res.send('hi search route')
})

module.exports = router;