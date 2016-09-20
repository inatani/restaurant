/**
 * Created by inatani on 5/4/16.
 */
var express = require('express');
var router = express.Router();

var routes = {
    user : require('../controllers/user'),
    auth : require('../controllers/auth')
};

//login
router.post('/login',routes.auth.loginUser);

//user
router.post('/api/user', routes.user.createUser);
router.get('/api/user', routes.user.getAll);
router.get('/api/user/:id',routes.user.getOne);
router.put('/api/user/:id',routes.user.update);
router.delete('/api/user/:id',routes.user.delete);



module.exports = router;
