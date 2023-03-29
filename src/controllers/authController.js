import { StatusCodes } from 'http-status-codes';

import BadRequest from '../errors/bad-request.js';
import User from '../models/User.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const { role } = req.body; //! JUST FOR TESTING

  if (!name || !email || !password) {
    throw new BadRequest('You cannot leave empty fields.');
  }

  const isEmailExist = await User.exists({ email });
  if (isEmailExist) {
    throw new BadRequest('Email already exists.');
  }

  const user = await User.create({ name, email, password, role });

  if (!user) {
    throw new BadRequest('Something went wrong.');
  }

  const token = await user.generateToken();
  res.status(StatusCodes.CREATED).json({
    msg: 'Success',
    user: { id: user._id, name: user.name, role: user.role },
    token,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest('You cannot leave empty fields .');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequest('Invalid credentials.');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequest('Invalid credentials.');
  }

  const token = await user.generateToken();
  res.status(StatusCodes.OK).json({
    msg: 'Success',
    user: { id: user._id, name: user.name, role: user.role },
    token,
  });
};
