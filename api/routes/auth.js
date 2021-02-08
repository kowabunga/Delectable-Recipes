import express from 'express';
import { login, sendResetLink, resetPassword } from '../controllers/auth.js';

const router = express.Router();

//@route    post api/auth
//@desc     log in user
//@access   public
router.post('/', login);

// @route   POST /api/auth/reset
// @desc    Create reset token and send reset email
// @access  Public
router.post('/reset', sendResetLink);

// @route   PATCH /api/auth/reset/:token
// @desc    Reset user password
// @access  Public
router.patch('/reset/:token', resetPassword);

export default router;
