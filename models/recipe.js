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

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = Recipe;