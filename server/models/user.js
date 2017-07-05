/*const express = require('express'),
    mongoose = require('mongoose'),
    database = require('./database'),
    route = require('./router'),
    bcrypt = require('bcryptjs');


const UserSchema =  mongoose.Schema({
        email: {
            type: String,
            lowercase: true,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    });

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function (next) {
    const user = this,
        SALT_FACTOR = 5;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);*/