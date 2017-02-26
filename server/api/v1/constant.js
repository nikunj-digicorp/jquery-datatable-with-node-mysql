var applicationConfiguration = {
  "PAGE_SIZE": 10, //
  "API_START_PATH": '/api/',
  "API_VERSION": 'v1',
  "DB_DATE_FORMAT": '%Y-%m-%d %H:%M:%S',
};

var requestMessages = {
  'ERR_API_KEY_NOT_FOUND': {
    code: 1001,
    message: 'api-key not found'
  },
  'ERR_INVALID_API_KEY': {
    code: 1002,
    message: 'Invalid api-key'
  },
  'ERR_INVALID_CREATE_USER_REQUEST': {
    code: 1003,
    message: 'Invalid create user request'
  },
  'ERR_INVALID_GET_USERS_REQUEST': {
    code: 1004,
    message: 'Invalid get users request'
  }
};

var userMessages = {
  'ERR_USER_IS_ALREADY_EXIST': {
    code: 10001,
    message: 'User is already exist'
  },
  'ERR_USER_IS_NOT_ACTIVE': {
    code: 10002,
    message: 'User is already exist, but not active'
  },
  'ERR_USERS_NOT_FOUND': {
    code: 10003,
    message: 'No user found'
  }
};

module.exports = {
  appConfig: applicationConfiguration,
  requestMessages: requestMessages,
  userMessages: userMessages
};
