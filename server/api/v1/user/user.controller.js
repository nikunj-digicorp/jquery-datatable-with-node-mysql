var userService = require('./user.service');
var constant = require('../constant');


/**
 * Created By: NP
 * Updated By: NP
 *
 * Get Users
 *
 * @param  {object} request
 * @param  {object} response
 * @return {object}
 */
var getUsers = function(request, response) {
  if (request.body !== undefined && typeof request.body === "object") {
    userService.getUsersService(request, function(result) {
      return response.send(result);
    });
  } else {
    return response.send({
      status: false,
      error: constant.requestMessages.ERR_INVALID_GET_USERS_REQUEST
    });
  }
};

/**
 * Created By: NP
 * Updated By: NP
 *
 * Creating New User
 *
 * @param  {object} request
 * @param  {object} response
 * @return {object}
 */
var createUser = function(request, response) {
  if (request.body !== undefined && typeof request.body === "object") {
    userService.createUserService(request, function(result) {
      return response.send(result);
    });
  } else {
    return response.send({
      status: false,
      error: constant.requestMessages.ERR_INVALID_CREATE_USER_REQUEST
    });
  }
};

module.exports = {
  getUsers: getUsers,
  createUser: createUser  
};
