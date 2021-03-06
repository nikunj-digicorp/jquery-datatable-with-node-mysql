var url = require('url');
var querystring = require('querystring');
var constant = require('./constant');
var queryExecutor = require('../../helper/mySql');
var pageSize = constant.appConfig.PAGE_SIZE;

module.exports.cloneObject = function(obejct) {
  return JSON.parse(JSON.stringify(obejct));
};

module.exports.trimString = function(string) {
  return string.replace(/  +/g, ' ');
};

module.exports.executeQuery = function(jsonQuery, cb) {
  queryExecutor.executeQuery(jsonQuery, function(result) {
    if (result.status === false && result.error.code === 10002) {
      cb({
        status: false,
        error: {
          code: 9001,
          message: "Error dublicate entry"
        }
      });
      return;
    }
    if (result.status === false) {
      cb({
        status: false,
        error: {
          code: 9000,
          message: "Error in executeQuery"
        }
      });
      return;
    }
    cb(result);
  });
};

module.exports.executeRawQuery = function(jsonQuery, cb) {
  queryExecutor.executeRawQuery(jsonQuery, function(result) {
    if (result.status === false && result.error.code === 10002) {
      cb({
        status: false,
        error: {
          code: 9001,
          message: "Error dublicate entry"
        }
      });
      return;
    }
    if (result.status === false) {
      cb({
        status: false,
        error: {
          code: 9000,
          message: "Error in executeQuery"
        }
      });
      return;
    }
    cb(result);
  });
};

module.exports.executeQueryWithTransactions = function(queryArrayJSON, cb) {
  queryExecutor.executeQueryWithTransactions(queryArrayJSON, function(result) {
    if (result.status === false) {
      cb({
        status: false,
        error: {
          code: 9000,
          message: "Error in executeQuery"
        }
      });
      return;
    }
    cb(result);
  });
};

module.exports.getPaginationObject = function(request) {
  var paginationObj = {};
  var serverDateTime;
  var pageNo;
  if (request.query.pageno === undefined || request.query.datetime === undefined) {
    pageNo = 1;
    serverDateTime = (new Date()).getTime();
  } else {
    pageNo = parseInt(request.query.pageno);
    serverDateTime = parseInt(request.query.datetime);
  }
  paginationObj.pageNo = pageNo;
  paginationObj.serverDateTime = serverDateTime;  
  paginationObj.limit = [pageSize * (pageNo - 1), pageSize];
  return paginationObj;
};

module.exports.paginationListing = function(request, result, pageNo, serverDateTime, errorMsg, cb) {
  debug("common -> paginationListing");
  if (result.status === false) {
    cb(result);
  } else if (result.content.length === 0 && pageNo === 1) {
    cb({
      status: false,
      error: errorMsg
    });
  } else {
    cb({
      status: true,
      page: pagination(request, result.content.length, pageNo, serverDateTime),
      data: result.content
    });
  }
};

module.exports.pagination = function(request, contentLength, pageNo, serverDateTime) {
  debug("common -> pagination");
  return pagination(request, contentLength, pageNo, serverDateTime);
};

function pagination(request, contentLength, pageNo, serverDateTime) {
  debug("common -> pagination()");
  var pageOptions = {};
  var pathName = (request.originalUrl).replace(constant.appConfig.API_START_PATH, '');
  pathName = (pathName).replace(constant.appConfig.API_VERSION, '');

  var URI = url.parse(pathName);
  var queryObj = querystring.parse(URI.query)

  pathName = URI.pathname + '?';

  if (pageNo === 1 && contentLength < constant.appConfig.PAGE_SIZE) {
    return pageOptions;
  }

  if (contentLength < constant.appConfig.PAGE_SIZE || pageNo !== 1) {
    queryObj.pageno = pageNo - 1;
    queryObj.datetime = serverDateTime;
    var newQueryString = querystring.stringify(queryObj)
    pageOptions.previous = pathName + newQueryString;
  }
  if (pageNo === 1 || contentLength === constant.appConfig.PAGE_SIZE) {
    queryObj.pageno = pageNo + 1;
    queryObj.datetime = serverDateTime;
    var newQueryString = querystring.stringify(queryObj)
    pageOptions.next = pathName + newQueryString;
  }
  return pageOptions;
}


module.exports.JSON2ARRAY = function(objArray) {
  debug("common -> JSON2ARRAY");
  var array = typeof objArray != 'object' ? [objArray] : objArray;
  //console.log(typeof objArray);
  var arrData = [];
  var str = '';
  if (array.length > 0) {
    var keys = Object.keys(array[0]);
    arrData.push(keys)

    //append data
    for (var i = 0; i < array.length; i++) {
      var line = [];

      for (var index = 0; index < keys.length; index++) {
        if (array[i].hasOwnProperty(keys[index])) {
          var val = array[i][keys[index]];
          line.push(val);
        } else {
          line.push(null);
        }
      }
      arrData.push(line);
    }
  }
  return arrData;
}
