const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/recipes');
});

// app.get('/logout', function(req, res){
//     req.logout();
//     res.redirect('/');
// });

module.exports = router;