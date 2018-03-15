function trimArray( array ){
    let filteredArray = array.filter( item => {
        return item.trim().length > 0;
    });
    let trimmedArray = filteredArray.map( item => {
        return item.trim();
    })
    if( trimmedArray.length > 0 ){
        return trimmedArray;
    } else {
        return null;
    };
}

function trimReqBody( body ) {
    let { title, author, description, ingredients, steps } = body;
    ingredients = trimArray(ingredients);
    steps = trimArray(steps);
    return { title, author, description, ingredients, steps };
};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    };
    req.flash("error", "You must be logged in to do that.");
    res.redirect("/login");
};

// function incomplete(document) {
//     for(let item in document) {
//         if(Array.isArray(document[item]) || typeof(document[item]) === Object){
//             return incomplete(document[item])
//         } else if(document[item].trim().length <= 0){
//             return true;
//         }
//     }
//     return false;
// }

module.exports = { trimReqBody, isLoggedIn };