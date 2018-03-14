const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        validate: {
            validator: notEmpty,
            message: 'Field cannot be blank.'
        }
    },
    author: String,
    description: {
        type: String,
        validate: {
            validator: notEmpty,
            message: 'Field cannot be blank.'
        }
    },
    ingredients: [String],
    steps: [String],
});

function notEmpty(value) {
    return value.trim().length > 0;
}

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = Recipe;