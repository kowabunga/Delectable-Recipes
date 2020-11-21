import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetTokenExpiry: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.matchPasswords = async function (oldPassword) {
  return await bcrypt.compare(oldPassword, this.password);
};

UserSchema.pre('save', async function (next) {
  // Checks if password field has been modified. If not, continue on. Otherwise, hash password
  if (!this.isModified('password')) {
    next();
  } else {
    const hashedPassword = await bcrypt.hash(
      this.password,
      await bcrypt.genSalt(10)
    );
    this.password = hashedPassword;
  }
});

const User = mongoose.model('user', UserSchema);
export default User;
