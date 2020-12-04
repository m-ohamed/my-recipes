const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema
({
    name:
    {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    ingredients:
    {
        type: String,
        required: true,
        trime: true,
        minlength: 1
    },
    recipe:
    {
        type: String,
        required: true,
        trime: true,
        minlength: 1
    },
    image:
    {
        type: String,
        required: false,
        trime: true,
        minlength: 1
    }

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;