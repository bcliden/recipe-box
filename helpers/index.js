module.exports.trimReqBody = function ( body ) {
    let { title, author, description, ingredients, steps } = body;
    ingredients = ingredients.filter(recipe => recipe.trim().length > 0);
    steps = steps.filter(step => step.trim().length > 0);
    return { title, author, description, ingredients, steps };
};