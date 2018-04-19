const mongoose = require('mongoose');
const Recipe = mongoose.model('recipe');
const helpers = require('../helpers/index');

module.exports = {
    index(req, res, next) {
        let size = parseInt(req.query.size || 10);
        let page = parseInt(req.query.page || 0);
        let entries = page * size;
        let sort = 'date';
        let sortDir = 'desc';
    
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
                .sort({ [sort]: [sortDir] })
                .skip(entries)
                .limit(size)
                .populate('author')
                .then( foundRecipes => {
                    if( foundRecipes.length < 1){
                        res.render('index', {
                            recipes: [{
                                title: 'Welcome to the Recipe Box!',
                                author: "You!",
                                description: 'To get started, please create an account and add a new recipe above!'
                            }],
                            page: {
                                range: '',
                                forward: 0,
                                back: 0,
                                last: 0,
                            },
                        });
                    } else {
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
                    }
                })
                .catch( err => {
                    next(err);
                });
        })
        .catch( err => {
            next(err);
        });
    },
    create(req, res, next) {
        // trim spaces and blank fields
        let trimmedBody = helpers.trimReqBody(req.body);
        trimmedBody.author = req.user._id;

        let newRecipe = new Recipe( trimmedBody );
        newRecipe.validate(function(err){
            if(err){
                req.flash('error', err.message);
                res.status(400).render('new', { recipe: req.body });
            } else {
                newRecipe.save()
                    .then( () => {
                        req.flash('success', 'Recipe added')
                        res.redirect('/recipes');
                    })
                    .catch( err => {
                        next(err);
                    });
            }
        })
    },
    new(req, res) {
        res.render('new', {recipe: null});
    },
    show(req, res, next) {
        Recipe.findById( req.params.recipeId )
            .populate('author')
            .then( foundRecipe => {
                res.render('show', { recipe: foundRecipe });
            })
            .catch( err => {
                next(err);
            });
    },

}