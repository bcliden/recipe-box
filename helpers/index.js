function trimArray( array ){
    let filteredArray = array
        .filter( item => {
            return item.trim().length > 0;
        })
        .map( item => {
            return item.trim();
        })
    if( filteredArray.length > 0 ){
        return filteredArray;
    } else {
        return null;
    };
}

function trimReqBody( body ) {
    let { title, description, ingredients, steps } = body;
    return { 
        title: title.trim(), 
        description: description.trim(), 
        ingredients: trimArray(ingredients), 
        steps: trimArray(steps),
    };
};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    };
    req.flash("error", "You must be logged in to do that.");
    res.redirect('/login');
};

module.exports = { trimReqBody, isLoggedIn };