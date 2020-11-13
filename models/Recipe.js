import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  recipeTitle: {
    type: String,
    required: true,
  },
  recipeDescription: {
    type: String,
    required: true,
  },
  recipeImage: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
  },
  recipeSteps: [
    {
      title: {
        type: String,
        required: true,
      },
      directions: {
        type: String,
        required: true,
      },
      media: {
        type: String,
      },
      mediaType: {
        type: String,
      },
      timer: {
        type: String,
      },
      optional: {
        type: String,
      },
    },
  ],
});

const Recipe = mongoose.model('recipe', RecipeSchema);
export default Recipe;
