var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// Register
router.get('/register', function (req, res, next) {
    res.render('register');
});

// Login
router.get('/login', function (req, res, next) {
    res.render('login');
});

// Register user
router.post('/register', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.passwordRegBox;
    var verify = req.body.verifyBox;
    var unlock = req.body.unlock;
    var lock = req.body.lock;

    // Validation
    req.checkBody('username', 'fill out username field').notEmpty();
    req.checkBody('passwordRegBox', 'fill out password field').notEmpty();
    req.checkBody('verifyBox', 'passwords do not match').equals(req.body.passwordRegBox);
    req.checkBody('unlock', 'enter webhook url for unlock door device command').notEmpty();
    req.checkBody('lock', 'enter webhook url for lock door device command').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        console.log(errors);
        res.render('register', {
            errors: errors
        });
    } else {
        var newUser = new User({
            username: username,
            password: password,
            unlockWebhook: unlock,
            lockWebhook: lock
        });

        User.createUser(newUser, function (err, user) {
            if (err) throw err;
            console.log(user);
        });

        res.redirect('/users/login');
    }
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.getUserByUsername(username, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: "User not found" });
            }
            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'wrong password' });
                }
            });
        })
    }));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
    function (req, res) {
        res.redirect('/');
    });

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/users/login');
});

module.exports = router;