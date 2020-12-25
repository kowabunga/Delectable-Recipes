import dotenv from 'dotenv';
import connectDb from './config/db.js';
import { userData } from './seedData/users.js';
import { recipesData } from './seedData/recipes.js';
import User from './models/User.js';
import Recipes from './models/Recipe.js';

dotenv.config({ path: './config/config.env' });

// Connect to db and either seed data if '-s' parameter is passed as arg, or remove data from db
connectDb();

const seedData = async () => {
  try {
    const user = await User.create(userData);

    const recipes = recipesData.map(recipe => ({
      ...recipe,
      userId: user._id,
      userName: user.name,
    }));

    console.log(recipes);

    await Recipes.insertMany(recipes);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const removeData = async () => {
  await User.deleteMany();
  await Recipes.deleteMany();

  process.exit(0);
};

if (process.argv[2] === '-s') {
  seedData();
} else if (process.argv[2] === '-d') {
  removeData();
} else {
  process.exit(0);
}
