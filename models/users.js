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

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt() //This will generate salt for us
    this.password = await bcrypt.hash(this.password, salt)// 'this' keyword is the local version of the user, we get access to the user using the this keyword
    next()
})

const User = mongoose.model('user', userSchema) // Created a model based on the above schema

module.exports = User; // Exporting the model