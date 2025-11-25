const userRepository = require('../repositories/user.repository');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await userRepository.User.isEmailTaken(userBody.email)) {
    throw new Error('Email already taken');
  }
  return userRepository.createUser(userBody);
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return userRepository.getUserById(id);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  return userRepository.queryUsers(filter, options);
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await userRepository.getUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  if (updateBody.email && (await userRepository.User.isEmailTaken(updateBody.email, userId))) {
    throw new Error('Email already taken');
  }
  return userRepository.updateUserById(userId, updateBody);
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await userRepository.getUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return userRepository.deleteUserById(userId);
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
