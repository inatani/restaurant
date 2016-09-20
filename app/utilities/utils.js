'use strict';
/**
 * Created by inatani on 5/4/16.
 */
var jwt = require('jwt-simple');
var _Utils = {
   genToken :  function (user) {
    var expires = _Utils.expiresIn(1);
    var token = jwt.encode({
      exp: expires
    }, require('../utilities/secret')());

    var filteredUser = {
      username: user.name.firstName + ' ' + user.name.lastName,
      emailid: user.emailID
    };

    return {
      token: token,
      expires: expires,
      user: filteredUser
    };
  },

  expiresIn : function (numberInDays) {
    var date = new Date();
    return date.setDate(date.getDate() + numberInDays);
  }
};

module.exports = _Utils;