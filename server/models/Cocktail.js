const { Schema, model } = require('mongoose');

const cocktailSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isAlcoholic: {
    type: Boolean,
    required: true,
  },
  ingredients: [
    {
      ingredient: {
        type: String,
      },
      measure: {
        type: String,
      }
    }
  ],
});

const Cocktail = model('Cocktail', cocktailSchema);

module.exports = Cocktail;
