const express = require('express');
const app = express();
const ejs = require('ejs');
const methodOverride = require('method-override');
const indexRoutes = require('./routes/index');
const recipeRoutes = require('./routes/recipes');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// EXPRESS CONFIG
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(require('express-session')({
    secret: 'Secret passphrase here',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// PASSPORT CONFIG
const User = require('./models/index').User;
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTING
app.use('/', indexRoutes);
app.use('/recipes', recipeRoutes);

// SERVER CONFIG
const port = process.env.port || 7575;
app.listen(port, () => {
    console.log('App \'the Recipe Box\' is running on port:', port)
});