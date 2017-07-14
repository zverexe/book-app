const express = require('express'),
    mongoose = require('mongoose'),
    database = require('../config/database'),
    authenticate = require('../authenticate'),
    bcrypt = require('bcryptjs');

//User Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//Generate hashed password
UserSchema.pre('save', function (next) {
    const user = this,
        SALT_FACTOR = 5;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err){ return next(err)};
    bcrypt.hash(user.password, salt, (err, hash) => {
        if (err){ return next(err)};
            user.password = hash;
            next();
        });
    });
});

const User = module.exports = mongoose.model('User', UserSchema);

//Get user id
module.exports.getUserId = function(id, callback){
    User.findById(id, callback);
};

//Check user email
module.exports.getUserByUsername = function(email, callback){
    const query = {email: email};
    User.findOne(query, callback);
};

//Check user password
module.exports.comparePassword = function(typedPassword, hash, callback){
    bcrypt.compare(typedPassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
};
