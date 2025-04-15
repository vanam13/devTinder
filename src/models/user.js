const { json } = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String, 
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email address: "+ value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("password is weak: "+ value);
            }
        }
    },
    age: {
        type: Number, 
        min: 18,
    },
    number: {
        type: String
    },
    photoUrl:{
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png",
    }, 
    about:{
        type: String,
        default: "this is the default about the user",
    },
    skills:{
        type: [String]

    }, 
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("gender data is not valid");
            }
        },

    }
},
{
    timestamps:true
});

const User = mongoose.model("User", userSchema);

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id: user._id}, "Dev@Tinder7", { 
        expiresIn: "1d",
    });

    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );

    return isPasswordValid;

}

module.exports = {User};