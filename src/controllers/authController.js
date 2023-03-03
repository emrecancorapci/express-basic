import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'You cannot leave empty fields.' });
  }

  const salt = await bcrypt.genSalt(10);
  const saltedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: saltedPassword,
    role,
  });
  const token = jwt.sign(
    { userId: user._id, name: user.name, role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );

  return res
    .status(201)
    .json({ msg: 'Success', user: { name: user.name }, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'You cannot leave empty fields.' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ msg: 'Invalid Credentials' });
  }

  const isPasswordCorrect = bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ msg: 'Invalid Credentials' });
  }

  const token = jwt.sign(
    { userId: user._id, name: user.name, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
  return res
    .status(200)
    .json({ msg: 'Success', user: { name: user.name }, token });
};
