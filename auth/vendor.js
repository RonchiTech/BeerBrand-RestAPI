const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.register = async (req, res, next) => {
  const fullName = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const checkEmail = await User.find({ email });
    console.log('checkEmail::', checkEmail);
    if (checkEmail.length) {
      const error = new Error('Email has been already used.');
      error.statusCode = 401;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const registerUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role: 'vendor',
    });
    const result = await registerUser.save();
    console.log('result:::', result);
    res.status(200).json({ message: 'User Created Successfully!' });
  } catch (err) {
    next(err);
  }
};
