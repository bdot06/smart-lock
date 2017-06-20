var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/user');

router.get('/', loggedIn, function(req, res, next) {
  res.render('locktop');
});

function loggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/users/login');
    }
}

router.get('/me', function(req,res){
    if(req.isAuthenticated()){
       return res.json(req.user);
    } else{
        return res.send(404);
    }
})


module.exports = router;