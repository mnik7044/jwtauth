const mongoose = require('mongoose')
const {isEmail} = require('validator')  // This is importing isEmail function from the validator package
const bcrypt = require('bcrypt')

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


// Fire a function after doc saved to database
 
//userSchema.post('save' , function(doc, next) {
//console.log("New User created and saved", doc) // doc is the user that we created
//next()

//})  // this does not mean post request but something happening post that


//Fire a function before a doc is saved
// This pre is a mongoose hook which means firing a function before a save event has occured
// So this function will fire before we save the schema to the database
//.hash() method takes in two arguments first is the password and the second article is the salt which we created.

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt() //This will generate salt for us
    this.password = await bcrypt.hash(this.password, salt)// 'this' keyword is the local version of the user, we get access to the user using the this keyword
    next()
})

// As we are using mongoose hook pre this will directly save the hashed password in the database and not the plain text password.

const User = mongoose.model('user', userSchema) // Created a model based on the above schema

module.exports = User; // Exporting the model