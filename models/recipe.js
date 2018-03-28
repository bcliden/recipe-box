const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    
    },
    ingredients: {
        type: [String],
        required: true,
    },
    steps: {
        type: [String],
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// VALIDATION FNs obsolete thanks to required
// this works well with the arrays thanks to trim middleware
// which nulls empty arrays

// function notEmpty(value) {
//     return value.trim().length > 0;
// }

// function notEmptyArray(array) {
//     return array.every(item => item.trim().length > 0);
// }

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = Recipe;