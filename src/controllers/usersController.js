import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ msg: 'Success', users });
  } catch (error) {
    return res.status(500).json({ msg: 'Failed', error });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ msg: 'Success', user });
  } catch (error) {
    return res.status(500).json({ msg: 'Failed', error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ msg: 'Success', user });
  } catch (error) {
    return res.status(500).json({ msg: 'Failed', error });
  }
};
