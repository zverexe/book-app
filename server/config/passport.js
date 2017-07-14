const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');
const database = require('./database');

module.exports = function(passport){
    var opts={};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = database.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserId(jwt_payload._doc._id, (err, user) => {
            if(err){
                return done(err, false);
            };
            if(user){
                return done(null, user);
            }else{
                return done(null, false);
            };
        });
    }));
}
