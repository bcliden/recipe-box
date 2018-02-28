const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: String,
    author: String,
    description: String,
    ingredients: [String],
    steps: [String],
});

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = Recipe;