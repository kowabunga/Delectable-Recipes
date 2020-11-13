import express from 'express';
import { check } from 'express-validator';
import { login, sendResetLink, resetPassword } from '../controllers/auth.js';

const router = express.Router();

//@route    post api/auth
//@desc     log in user
//@access   public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

// @route   POST /api/auth/reset
// @desc    Create reset token and send reset email
// @access  Public
router.post('/reset', sendResetLink);

// @route   PATCH /api/auth/reset/:token
// @desc    Reset user password
// @access  Public
router.patch('/reset/:token', resetPassword);

export default router;
