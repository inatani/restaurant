'use strict';
/**
 * Created by inatani on 5/4/16.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 8;

var User_ = new mongoose.Schema({
  name : {
    firstName:String,
    lastName:String
  },
  contact : {
    emailID:{type:String,unique:true},
    phoneNumber:{type:String,unique:true}
  },
  address : {
    street : String,
    address1 : String,
    address2 : String,
    city : String,
    State : String,
    pinCode : Number
  },
  password:String
});

User_.pre('save',function(next){
  var user = this;
  if (!user.isModified('password')){
    return next();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR,function(err, salt){
    if (err){
      return next(err);
    }
    bcrypt.hash(user.password, salt, function(err, hash){
      if (err){
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

User_.methods.comparePassword = function(userPassword, cb){
  bcrypt.compare(userPassword, this.password, function(err, isMatch){
    if(err){
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('user', User_);
