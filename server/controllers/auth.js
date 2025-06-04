 const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

// ==================== REGISTER CONTROLLER ====================
const register = async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    const avatar = req.file ? req.file.path.replace(/\\/g, "/") : ""; // Ensure path is web-safe

    if (!email || !password || !userName) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Please provide email, password, and username' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email already in use' });
    }

    const user = await User.create({ email, password, userName, avatar });

    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      user: {
        userName: user.userName,
        email: user.email,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error('Registration Error:', error.message);
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || 'Registration failed' });
  }
};

// ==================== LOGIN CONTROLLER ====================
const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Please provide username and password' });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      user: {
        userName: user.userName,
        email: user.email,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || 'Login failed' });
  }
};

module.exports = {
  register,
  login,
};
