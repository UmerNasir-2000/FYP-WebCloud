const {
  registerUserService,
  loginUserService,
  forgotPasswordService,
} = require("../services/auth.service");

/**
 *   @desc    POST Register User on Web Cloud
 *   @route   POST /api/auth/register
 *   @access  PUBLIC
 *   @author  UMER NASIR
 **/

const registerUser = async (req, res) => {
  await registerUserService(req, res);
};

/**
 *   @desc    POST Login User on Web Cloud
 *   @route   POST /api/auth/login
 *   @access  PUBLIC
 *   @author  UMER NASIR
 **/

const loginUser = async (req, res) => {
  await loginUserService(req, res);
};

/**
 *   @desc    POST Forgot Password
 *   @route   POST /api/auth/forgot-password
 *   @access  PUBLIC
 *   @author  UMER NASIR
 **/

const forgotPassword = async (req, res) => {
  await forgotPasswordService(req, res);
};

module.exports = { registerUser, loginUser, forgotPassword };
