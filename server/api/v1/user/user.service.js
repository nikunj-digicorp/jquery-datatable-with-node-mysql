var common = require('../common');
var constant = require('../constant');
var userDAL = require('./user.DAL');
var dbDateFormat = constant.appConfig.DB_DATE_FORMAT;


/**
 * Created By: NP
 * Updated By: NP
 *
 * get users service
 * @param  {object}   request
 * @param  {Function} cb
 * @return {object}   
 */
var getUsersService = function (request, cb) {
    // if (request.body.first_name === undefined || request.body.last_name === undefined ||  request.body.mobile_number === undefined) {
    //     cb({
    //         status: false,
    //         error: constant.requestMessages.ERR_INVALID_CREATE_USER_REQUEST
    //     });
    //     return;
    // }

    userDAL.getUsers(function (result) {
        if (result.status === false) {
            cb(result);
            return;
        } else if (result.content.length == 0) {
            cb({
                status: false,
                error: constant.userMessages.ERR_USERS_NOT_FOUND
            });
            return;
        }
        cb({
            status: true,
            data: result.content
        });

    }); // END checkUserIsExist
};

/**
 * Created By: NP
 * Updated By: NP
 *
 * create user service
 * @param  {object}   request
 * @param  {Function} cb
 * @return {object}   
 */
var createUserService = function (request, cb) {
    if (request.body.first_name === undefined || request.body.last_name === undefined || request.body.mobile_number === undefined) {
        cb({
            status: false,
            error: constant.requestMessages.ERR_INVALID_CREATE_USER_REQUEST
        });
        return;
    }
    var first_name = request.body.first_name;
    var last_name = request.body.last_name;
    var mobile_number = request.body.mobile_number;

    userDAL.checkUserIsExist(mobile_number, function (result) {
        if (result.status === false) {
            cb(result);
            return;
        } else if (result.content.length > 0) {
            var userInfo = result.content[0];
            // check user is active or not
            if (userInfo.is_active == false) {
                cb({
                    status: false,
                    error: constant.userMessages.ERR_USER_IS_NOT_ACTIVE
                });
                // check user is verify or not
            } else {
                cb({
                    status: false,
                    error: constant.userMessages.ERR_USER_IS_ALREADY_EXIST
                });
            }
            return;
        }

        // save user info
        userDAL.createUser(first_name, last_name, mobile_number, function (result) {
            if (result.status === false) {
                cb(result);
            } else {
                cb({
                    status: true,
                    data: {
                        user_id: result.content.insertId
                    }
                });
            }
        }); // END createUser
    }); // END checkUserIsExist
};

module.exports = {
    getUsersService: getUsersService,
    createUserService: createUserService
};
