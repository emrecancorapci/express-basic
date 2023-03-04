import bcrypt from 'bcryptjs';

import User from '../models/User.js';
import until from '../middlewares/async-wrapper.js';

export const getAllUsers = await until(async (req, res) => {
  const users = await User.find();
  return res.status(200).json({ msg: 'Success', users });
});

export const getUser = await until(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.status(200).json({ msg: 'Success', user });
});

export const deleteUser = await until(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.status(200).json({ msg: 'Success', user });
});

export const updateUser = await until(async (req, res) => {
  const { id } = req.params;

  const { password } = req.body;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    const saltedPassword = await bcrypt.hash(password, salt);
    req.body.password = saltedPassword;
  }

  const { name, email, role } = await User.findOneAndUpdate(
    { _id: id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!name) return res.status(404).json({ message: 'User not found' });
  return res.status(200).json({ msg: 'Success', user: { name, email, role } });
});
