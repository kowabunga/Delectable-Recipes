import Recipe from '../../models/Recipe.js';
import checkValidationResult from '../../utilities/checkValidationResults.js';

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    if (!recipes) {
      return res.status(404).json({ msg: 'No recipes found' });
    }

    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ msg: 'No recipe found for this id' });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

export const createRecipe = async (req, res) => {
  // Run validation check. If errors exist, send 400 status and errors list
  const [hasError, errors] = checkValidationResult(req, res);
  if (hasError) res.status(400).json({ errors: errors.array() });

  try {
    // ! See if this is even needed
    //  get the logged in user - need to add user id to recipe.
    // const user = await User.findById(req.user.id);

    // if (!user) {
    //   return res
    //     .status(400)
    //     .json({ success: false, error: 'User does not exist' });
    // }

    const {
      recipeTitle,
      recipeDescription,
      recipeImage,
      ingredients,
      recipeSteps,
    } = req.body;

    const recipe = new Recipe({
      user: req.user.id,
      recipeTitle,
      recipeDescription,
      recipeImage,
      ingredients,
      recipeSteps,
    });

    await recipe.save();

    res.status(201).json({ success: true, msg: 'Recipe Created' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export const updateRecipe = async (req, res) => {
  // Run validation check. If errors exist, send 400 status and errors list
  const [hasError, errors] = checkValidationResult(req, res);
  if (hasError) res.status(400).json({ errors: errors.array() });

  try {
    const {
      recipeTitle,
      recipeDescription,
      recipeImage,
      ingredients,
      recipeSteps,
    } = req.body;

    let recipe = await Recipe.findById({ _id: req.params.id });
    if (!recipe) {
      return res
        .status(400)
        .json({ success: false, error: 'Recipe does not exist' });
    }

    // No need to make "new Recipe({})" since we're updating one that already exists - \gets rid of MongoError: Performing an update on the path '_id' would modify the immutable field '_id'\ error
    const updatedRecipe = {
      user: req.user.id,
      recipeTitle,
      recipeDescription,
      recipeImage,
      ingredients,
      recipeSteps,
    };

    await Recipe.findByIdAndUpdate({ _id: req.params.id }, updatedRecipe);

    return res.status(200).json({ success: true, recipe: updatedRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

export const deleteRecipeById = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete({ _id: req.params.id });

    res.status(200).json({ success: true, msg: 'Recipe deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
