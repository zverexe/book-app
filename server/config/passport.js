const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../user');
const database = require('../database');

module.exports = function(passport){
    var opts={};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = database.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        console.log(jwt_payload);
        User.getUserId(jwt_payload._doc._id, (err, user)=>{
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            }else{
                return done(null, false);
            }
            });
        }));
}
