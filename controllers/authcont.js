const User = require("../models/users")  // Importing the user model

// Error Handling

const handleErrors = (err) =>{
    console.log(err.message, err.code)
    let errors = {email: '' , password: ''}
    //duplicate error code
     if(err.code === 11000){
     errors.email = "This email is already registered"
     return errors
     }
    //validation errors
    if(err.message.includes('user validation failed'))
    {
    Object.values(err.errors).forEach(({properties}) =>{
    errors[properties.path] = properties.message
})
}
return errors
}



module.exports.signup_get = (req,res) =>{
  res.render('signup')
}

module.exports.login_get = (req,res) =>{
    res.render('login')
}
module.exports.signup_post = async (req,res) =>{
    const{ email, password } = req.body
    try  // What we are gonna do is to try to create a new users on the given info using the data models
    {   
        const user = await User.create({email, password}) // This will create a new user in the database
        res.status(201).json(user) // sending the user object as a json file


    } catch(err){
        const errors = handleErrors(err)
        res.status(400).json({errors}) // We are sending a json where the password property hold the password's error and email holds the email error
        
    }
    
}
module.exports.login_post = async (req,res) =>{
    res.send('user login')
}
