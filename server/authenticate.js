const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('./user');
const Book = require('./models/bookModel');
const database = require('./database');

function generateToken(user) {
    console.log(database.secret);
    return jwt.sign(user, database.secret, {
        expiresIn: 604800 // in seconds
    });
}

// Register user
exports.register = function (req, res, next) {

    const email = req.body.email;
    const password = req.body.password;

    // Return error if no email provided
    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address.' });
    }

    // Return error if no password provided
    if (!password) {
        return res.status(422).send({ error: 'You must enter a password.' });
    }

    User.findOne({ email }, (err, existingUser) => {
        if (err) { return next(err); }

        // If user is not unique, return error
        if (existingUser) {
            return res.status(422).send({ error: 'That email address is already in use.' });
        }
    let newUser = new User({
        email,
        password
    });

    function setUserInfo(request) {
        const getUserInfo = {
            _id: request._id,
            email: request.email,
            password: request.password
        };
        return getUserInfo;
    };

    newUser.save((err, user) => {
        if (err) return next(err);

        const userInfo = setUserInfo(user);
        res.json({
            success: true,
            token: `JWT ${generateToken(userInfo)}`,
            user: userInfo
         });

        });
    });
};

// Login user
exports.login = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByUsername(email, (err, user)=>{
        if(err) throw err;

        if(!user){
            return res.json({success: false, msg: 'not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token= jwt.sign(user, database.secret, {
                    expiresIn: 604800 // in seconds
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        name: user.email
                    }
                });
            }else{
                return res.json({success: false, msg: 'not found'});
            };
        });
    });
};





//module.exports = router;
