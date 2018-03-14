function trimReqBody( body ) {
    let { title, author, description, ingredients, steps } = body;
    ingredients = ingredients.filter(recipe => recipe.trim().length > 0);
    steps = steps.filter(step => step.trim().length > 0);
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