import express from 'express';
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipeById,
} from '../controllers/recipes.js';

const router = express.Router();

// @route   GET api/recipes/
// @desc    Get all recipes
// @access  public
router.get('/', getRecipes);

// @route   GET api/recipes/:id
// @desc    Get recipe by id
// @access  public
router.get('/:id', getRecipeById);

// @route   POST api/recipes
// @desc    Create a recipe
// @access  private - temp public
router.post(
  '/',
  createRecipe
);

// @route   PUT api/recipes/:id
// @desc    Update recipe by id
// @access  private
router.put(
  '/:id',
  updateRecipe
);

// @route   DELETE api/recipes/:id
// @desc    Delete recipe by id
// @access  public
router.delete('/:id', deleteRecipeById);

export default router;
