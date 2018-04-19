const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');
const User = require('../models').User;
const AuthController = require('../controllers/auth_controller');

router.get('/', (req, res) => {
    res.redirect('/recipes');
});

 // AUTH ROUTES

router.post('/register', AuthController.register);

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

router.get('/logout', AuthController.logout);

module.exports = router;