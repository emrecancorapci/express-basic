import { StatusCodes } from 'http-status-codes';

import User from '../models/User.js';

import NotFoundError from '../errors/not-found.js';
import BadRequestError from '../errors/bad-request.js';

export const getAllUsers = async (req, res) => {
  const {
    user: { role },
  } = req;

  if (role !== 'admin')
    throw new BadRequestError('You are not authorized to access this route.');

  const users = await User.find();
  return res.status(StatusCodes.OK).json({ msg: 'Success', users });
};

export const getUser = async (req, res) => {
  const {
    params: { id },
  } = req;

  const user = await User.findById(req.params.id);
  if (!user) throw new NotFoundError(`User not found with this id: ${id}`);

  return res.status(StatusCodes.OK).json({ msg: 'Success', user });
};

export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) throw new NotFoundError('User not found');

  return res.status(StatusCodes.OK).json({ msg: 'Success', user });
};

export const updateUser = async (req, res) => {
  const {
    user: { userId, userRole },
  } = req;
  const { paramId } = req.params;

  if (userId !== paramId && userRole !== 'admin')
    throw new BadRequestError('You are not authorized to access this route.');

  const { password } = req.body;
  if (password) {
    throw new BadRequestError('You cannot change your password.');
  }

  // I think user can send any data to update,
  // so I need to check if the data is valid.
  // But maybe mongoose already does this?
  const { name, email, role } = await User.updateOne(
    { _id: paramId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!name) throw new NotFoundError('User not found');

  return res
    .status(StatusCodes.OK)
    .json({ msg: 'Success', user: { name, email, role } });
};
