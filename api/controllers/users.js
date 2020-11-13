import Recipe from '../../models/Recipe.js';
import User from '../../models/User.js';
import { validationResult } from 'express-validator';
import createJwt from '../../utilities/createJWT.js';

export const getUserInfo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById({ _id: req.user.id }).select('-password');

    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: 'User does not exist' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email: email });

    //   Check if user exists. Return error if so
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: 'User already exists' });
    }

    //   Create new user
    user = new User({
      name,
      email,
      password,
    });

    //   add to db
    await user.save();

    //   create and return jwt adding user id as payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = createJwt(payload);
    res.status(200).json({ token: token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export const updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return status(400).json({ success: false, msg: 'User not found' });
    }

    const { email, name, oldPassword, newPassword } = req.body;

    // Check if name or email changed and update if so
    if (name !== user.name) user.name = name;
    if (email !== user.email) user.email = email;
    if (newPassword) user.password = newPassword;

    // Check if old password matches password in db
    if (await user.matchPasswords(oldPassword)) {
      await user.save();
      return res.status(200).json({ success: true, user });
    } else {
      return res
        .status(400)
        .json({ success: false, msg: 'Old password mismatch' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export const getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id });

    if (!recipes) {
      return res
        .status(400)
        .json({ success: false, error: 'User has no recipes' });
    }

    res.status(200).json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};