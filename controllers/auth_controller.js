const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = {
    register(req, res) {
        let newUser = new User({ username: req.body.username });
        User.register( newUser, req.body.password, function(err, account) {
            if (err) {
                req.flash('error', err.message);
                res.redirect(400, 'login');
            } else {
                req.login(account, function(err){
                    if (err) {
                        console.error(err.message);
                        req.flash('error', err.message);
                        res.redirect(500, 'login');
                    } else {
                        req.flash('success','Logged in successfully. Welcome to The Recipe Box!');
                        res.redirect('/recipes');
                    }
                })
            }
        })
    },
    logout(req, res){
        req.logout();
        req.flash('success', 'You have been logged out.')
        res.redirect('/recipes');
    },
}