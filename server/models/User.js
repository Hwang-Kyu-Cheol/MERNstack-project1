const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

userSchema.pre('save', function(next){
    let user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err){
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err){
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, callBack){
    bcrypt.compare(plainPassword, this.password, function(err, same){
        if(err){
            return callBack(err);
        }
        callBack(null, same);
    });
}

userSchema.methods.generateToken = function(callBack){
    let user = this;
    let token = jwt.sign(user._id.toHexString(), 'secret');

    user.token = token;
    user.save(function(err, user){
        if(err){
            return callBack(err);
        }
        return callBack(null, user);
    })
}

userSchema.statics.findByToken = function(token, callBack){
    const userModel = this;

    jwt.verify(token, 'secret', function(err, decoded){
        if(err){
            console.log(err);
            return callBack(err);
        }

        userModel.findOne({ _id: decoded, token: token }, function(err, user){
            if(err){
                return callBack(err);
            } else {
                return callBack(null, user);
            }
        });
    });
}

const User = mongoose.model('User', userSchema);

module.exports = { User };