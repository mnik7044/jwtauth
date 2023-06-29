const mongoose = require('mongoose')
const {isEmail} = require('validator')  // This is importing isEmail function from the validator package

// First thing is we gonna create schema. Schema dictates how different object/documents are gonna look

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"], // First argument is what is required and the second is the error if that doesnt happens
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]},
    password:{
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Minimum password lenght is 6 characters"],
    }
})

const User = mongoose.model('user', userSchema) // Created a model based on the above schema

module.exports = User; // Exporting the model