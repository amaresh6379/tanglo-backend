const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const user = require('../models').user;

module.exports = function (passport) {    
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = CONFIG.jwt_encryption;
  opts.passReqToCallback = true;
  passport.use(new JwtStrategy(opts, async function (req,jwt_payload, done) {
    if (jwt_payload && jwt_payload.email && jwt_payload.env) {
        if(jwt_payload.env === CONFIG.ENVIRONMENT){
            const [userErr,userDetails] = await to(user.findOne({
                where:{
                    email: jwt_payload.email
                }
            }))
            if(userErr){
                return done(null, false)
            }
            if(userDetails) {
                jwt_payload['userId'] = userDetails.dataValues?.id;
                return done(null, jwt_payload);
            }
            if(!userDetails) return done(null, false); 
        }
        else{
            return done(null,false);
        }
    } else {
      return done(null, false);
    }
  }));
}


