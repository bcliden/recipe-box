const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');
const User = require('../models').User;

router.get('/', (req, res) => {
    res.redirect('/recipes');
});

 // AUTH ROUTES

 router.post('/register', function(req, res) {
    console.log('we hit the register route');
    let newUser = new User({ username: req.body.username });
    User.register( newUser, req.body.password, function(err, account) {
        if (err) {
            req.flash('error', err.message);
            res.redirect('login');
        } else {
            req.login(account, function(err){
                if (err) {
                    req.flash('error', err.message);
                    res.redirect('login');
                } else {
                    req.flash('success','Logged in successfully. Welcome to The Recipe Box!');
                    res.redirect('/recipes');
                }
            })
        }

    });
});

router.get('/login', function(req, res){
    res.render('login', {});
});

 router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/recipes',
        failureRedirect: '/login',
        successFlash: `Logged in successfully.`,
        failureFlash: true,
    }),
    function(req, res) {
        console.log('this never activates');
        res.redirect('/recipes');
});

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You have been logged out.')
    res.redirect('back');
});

module.exports = router;