const { User } = require('../models/User');

const auth = function(req, res, next){
    const token = req.cookies.x_auth;
    User.findByToken(token, function(err, user){
        if(err){
            next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

module.exports = { auth };