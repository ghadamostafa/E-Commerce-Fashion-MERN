const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const userSchema = new schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: [validator.isEmail, 'Please fill a valid email address'],
        unique: true
    },
    password: {
        //add more validations on password
        type: String,
        required: true,
        minlength: 6,
        trim: true,
    },
    enabled: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    }
});
userSchema.plugin(uniqueValidator);

//middleware to encrypt password before saving user 
userSchema.pre('save',async function (next) {
    const user = this
    if (user.isModified('password')) {
        await encryptPassaword(user)
    }
    next()
})

userSchema.methods.generateAccessToken = async function () {
    const user = this;
    const token = await jwt.sign(user.toJSON(), process.env.ACCSESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_DATE
    });
    return token;
}

userSchema.statics.findByCredentials = async function (email, password) {

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login ,password or email is invalid');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login ,password or email is invalid');
    }
    return user;
}

module.exports = User = mongoose.model('user', userSchema);


 function encryptPassaword(user) {
    return bcrypt.genSalt(10)
        .then(salt => {
            return bcrypt.hash(user.password, salt)
        }).then((hash)=>{
            user.password = hash;
        })
        .catch(error => {
            throw error;
        })
}



// add user
// module.exports.addUser = function (data) {
//     const newUser = new User({
//         name: data.name,
//         email: data.email,
//         role: data.role
//     });
//     newUser = encryptPassaword(newUser, data.password);
//     return newUser;

// };