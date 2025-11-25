const userService = require('../services/user.service');
const { successResponse, errorResponse } = require('../utils/response.util');

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    successResponse(res, user, 'User created successfully', 201);
  } catch (error) {
    errorResponse(res, error.message, 400, error);
  }
};

const getUsers = async (req, res) => {
  try {
    const filter = {}; // Add filtering logic
    const options = {}; // Add pagination/sorting logic
    const result = await userService.queryUsers(filter, options);
    successResponse(res, result, 'Users retrieved successfully');
  } catch (error) {
    errorResponse(res, error.message, 500, error);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }
    successResponse(res, user, 'User retrieved successfully');
  } catch (error) {
    errorResponse(res, error.message, 500, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUserById(req.params.userId, req.body);
    successResponse(res, user, 'User updated successfully');
  } catch (error) {
    errorResponse(res, error.message, 400, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUserById(req.params.userId);
    successResponse(res, null, 'User deleted successfully', 204);
  } catch (error) {
    errorResponse(res, error.message, 400, error);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
