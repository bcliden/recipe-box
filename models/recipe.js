const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        validate: {
            validator: notEmpty,
            message: 'Title cannot be blank.'
        }
    },
    author: String,
    description: {
        type: String,
        validate: {
            validator: notEmpty,
            message: 'Description cannot be blank.'
        }
    },
    ingredients: {
        type: [String],
        validate: {
            validator: notEmptyArray,
            message: 'Ingredients cannot be blank.'
        },
    },
    steps: {
        type: [String],
        validate: {
            validator: notEmptyArray,
            message: 'Steps cannot be blank.'
        },
    },
});

function notEmpty(value) {
    return value.trim().length > 0;
}

function notEmptyArray(array) {
    return array.every(item => item.trim().length > 0);
}

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = Recipe;