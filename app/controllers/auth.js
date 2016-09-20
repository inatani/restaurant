'use strict';
/**
 * Created by inatani on 5/4/16.
 */
var userModel = require('../models/user');
var utils = require('../utilities/utils');

var auth = {
  loginUser : function (req, res){
    var username = req.body.username || '';
    var password = req.body.password || '';
//    console.log("usename -> "+req.body.username);

    if(username === '' || password === ''){
      res.status(401);
      res.json({
        'status' : 401,
        'message' : 'unauthorized'
      });
      return;
    }
    var userInfo = {
      'username' : username,
      'password' : password
    };
//    console.log(JSON.stringify(userInfo));
    auth.validateUser(userInfo, function(err, result){
      if(err){
        res.status(401);
        res.json({
          'status' : 401,
          'message' : 'Invalid Username Password'
        });
        return;
      } else {
        console.log(JSON.stringify(result));
        res.json(utils.genToken(result));
      }
    });
  },
  validateUser : function (userInfo, callback){
    var username = userInfo.username;
    var password = userInfo.password;
    userModel.findOne({'contact.emailID' : username},function(err, user){
        if(err){
          throw err;
        }
      console.log("user "+JSON.stringify(user));
      user.comparePassword(password, function(err, isMatch){
            if (err){
              throw err;
            }
            console.log('Password : '+ isMatch);
            if(isMatch){
              callback(null, user);
            } else{
              callback(null, err);
            }
        });
    });
  },
  validate : function (emailID,cb){
    userModel.findOne({'contact.emailID' : emailID}, function(err, user){
        if(err){
          throw err;
        }
        else{
          cb(null,user);
        }
    });
  }
};

module.exports = auth;
