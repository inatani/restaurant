/**
* Created by inatani on 5/4/16.
*/
var MONGOPATH = process.env.APP_RESTAURANT || '127.0.0.1:27017/restaurant';
var MONGODB_URL = 'mongodb://'+MONGOPATH;
console.log(MONGODB_URL);
var connectDB = {
  DB_URL : MONGODB_URL
};
module.exports = connectDB;
