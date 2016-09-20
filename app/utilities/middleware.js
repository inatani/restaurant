'use strict';
/**
 * Created by inatani on 5/4/16.
 */
var jsonToken = require('jwt-simple');
var validateUser = require('../controllers/auth').validate;

var validateRequests = function(req, res, next){
  var token = (req.body && req.body.accessToken) || (req.query && req.query.accessToken) ||(req.headers['x-access-token']);
  var key =  (req.body && req.body.xKey) || (req.query && req.query.xKey) ||(req.headers['x-key']);
  console.log(token + " Key "+ key);
  if (token || key){
//    try {
//      var decoded = jsonToken.decode(token, require('../utilities/secret'));
    var decoded = jsonToken.decode(token, 'secret');
      console.log("decoded " + decoded);
      if(decoded.exp <= Date.now()){
        res.state(400);
        res.json({
          'status' : 400,
          'message' : 'Token Expired'
        });
        return;
      }
      var loginUser = validateUser(key,function(req, resp){
        console.log("login user status "+ JSON.stringify(resp));
        if(resp){
          if(resp.contact.emailID === key){
            next();
          } else {
            res.status(403);
            res.json({
              'status' : 403,
              'message' : 'unauthorized user'
            });
            return;
          }
        } else {
          res.status(401);
          res.json({
            'status' : 401,
            'message' : 'invalid user'
          });
        }
      });
  } else {
    res.status(401);
    res.json({
      'status' : 401,
      'message' : 'Invalid Token or Key'
    });
    return;
  }
};
module.exports = validateRequests;
