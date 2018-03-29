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
    let size = Number(req.query.size) || 10;
    let page = Number(req.query.page) || 0;
    let entries = page * size;

    let count, range, back, forward, last;
    Recipe.count({}, (err, c) => {
        count = c;
    }).then( () => {
        range = `${page*size+1} - ${page*size+size} of ${count}`;
        last = Math.round(count/size);
        if( page-1 >= 0 ){ back = page-1 } else { back = 0 };
        if( page+1 <= last ){ forward = page+1 } else { forward = last};
    }).then( () => {
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
    });
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