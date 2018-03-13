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
    User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/recipes');
        });
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
        res.redirect('/recipes');
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/recipes');
});

module.exports = router;