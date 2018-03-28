const express = require('express');
const app = express();
const ejs = require('ejs');
const methodOverride = require('method-override');
const flash = require('flash');
const logger = require('morgan');
const indexRoutes = require('./routes/index');
const recipeRoutes = require('./routes/recipes');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

console.log(app.get('env'));;

// EXPRESS CONFIG
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(require('express-session')({
    secret: 'Secret passphrase here',
    resave: false,
    saveUninitialized: false
}));

// PASSPORT CONFIG
app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/index').User;
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// FLASH CONFIG (must be after session middleware)

app.use(flash());
app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
});

// ROUTING
app.use('/', indexRoutes);
app.use('/recipes', recipeRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handlers
  
  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      console.log("dev err: ", err);
      console.log("dev err.message: ", err.message)
      res.render('error', {
        message: err.message,
        error: err
      });
    });
 } 
  
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log("production err: ", err);
    console.log("production err.message: ", err.message)
    res.render('error', {
      message: err.message,
      error: null,
    });
  });

// SERVER CONFIG
const port = process.env.port || 7575;
app.listen(port, () => {
    console.log('App \'the Recipe Box\' is running on port:', port)
});