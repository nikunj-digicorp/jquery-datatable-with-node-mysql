var common = require('../common');
var constant = require('../constant');
var query = require('./user.query');
var dbDateFormat = constant.appConfig.DB_DATE_FORMAT;

var getUsers =  function(cb) {  
  var getUsersQuery = common.cloneObject(query.getUsersQuery);  
  common.executeQuery(getUsersQuery, cb);
};

var checkUserIsExist = function(mobile_number, cb) {  
  var checkUserIsExistQuery = common.cloneObject(query.checkUserIsExistQuery);  
  checkUserIsExistQuery.filter.and[0].value = mobile_number;
  common.executeQuery(checkUserIsExistQuery, cb);
};

var createUser = function(first_name, last_name, mobile_number, cb) {  
  var createUserQuery = common.cloneObject(query.createUserQuery);
  createUserQuery.insert.fValue = [first_name, last_name, mobile_number];
  common.executeQuery(createUserQuery, cb);
};

module.exports = {
  getUsers: getUsers,
  checkUserIsExist: checkUserIsExist,
  createUser: createUser
};
