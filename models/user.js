var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    username: {type: String},
    password: { type: String },
    unlockWebhook: {type: String},
    lockWebhook: {type: String}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.comparePassword = function(enteredPassword, hash, callback) {
    bcrypt.compare(enteredPassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
});
}