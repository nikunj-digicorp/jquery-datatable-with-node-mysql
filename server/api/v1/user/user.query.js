var tbl_user_master = "tbl_user_master";

var query = {
  /* get users query start */
  getUsersQuery: {
    table: tbl_user_master,
    select: [{
      field: 'pk_userId',
      alias: 'user_id'
    }, {
      field: 'IFNULL(firstName,"")',
      encloseField: false,
      alias: 'first_name'
    }, {
      field: 'IFNULL(lastName,"")',
      encloseField: false,
      alias: 'last_name'
    }, {
      field: 'isActive',
      encloseField: false,
      alias: 'is_active'
    }],
    filter: {
      and: [{
        field: 'isDeleted',
        operator: 'EQ',
        value: '0'
      }]
    }
  },  /* get users query end */

  /* check user is exist query start */
  checkUserIsExistQuery: {
    table: tbl_user_master,
    select: [{
      field: 'pk_userId',
      alias: 'user_id'
    }, {
      field: 'IFNULL(firstName,"")',
      encloseField: false,
      alias: 'first_name'
    }, {
      field: 'IFNULL(lastName,"")',
      encloseField: false,
      alias: 'last_name'
    }, {
      field: 'isActive',
      alias: 'is_active'
    }],
    filter: {
      and: [{
        field: 'mobileNumber',
        operator: 'EQ',
        value: ''
      }, {
        field: 'isDeleted',
        operator: 'EQ',
        value: '0'
      }]
    }
  }, // check user is exist query end

  /* create user query start */
  createUserQuery: {
    table: tbl_user_master,
    insert: {
      field: ["firstName", "lastName", "mobileNumber"],
      fValue: []
    }
  },  
};


module.exports = query;
