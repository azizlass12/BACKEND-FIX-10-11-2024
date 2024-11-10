const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
  },
});

// Match Password method for comparing passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  const result = await bcrypt.compare(enteredPassword, this.password);
  console.log("Password comparison result:", result);  // Log comparison result
  return result;
};

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();  // Skip hashing if the password hasn't been modified
  }

  // Hash password before saving it
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
