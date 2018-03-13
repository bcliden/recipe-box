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

  module.exports = { trimReqBody, isLoggedIn };