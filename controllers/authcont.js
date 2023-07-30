const User = require("../models/users")  // Importing the user model
const jwt = require('jsonwebtoken')


// Error Handling

const handleErrors = (err) =>{
    console.log(err.message, err.code)
    let errors = {email: '' , password: ''} // If there is a email error we will update the first property, if password second prop
    
    //Incorrect email
    if(err.message === 'Incorrect Email'){
        errors.email = 'that email is not registered'
    }

    //Incorrect Password
    if(err.message === 'Incorrect Password'){
        errors.password = 'that password is wrong'
    }
    
    
    //duplicate error code
     if(err.code === 11000){
     errors.email = "This email is already registered"  // We are taking ity from console after destructuring
     return errors
     }
    //validation errors
    if(err.message.includes('user validation failed')) // The 'user validation failed' is the error we got from console
    {
    Object.values(err.errors).forEach(({properties}) =>{ // Inside err object we have different properties errors
    errors[properties.path] = properties.message
})
}  
return errors
}

const maxAge = 3 *24 *60 *60;  // This is a time in second, unlike cookie which except time in millisecond

const createToken = (id) => {
    return jwt.sign({ id }, 'a secret string', {expiresIn: maxAge })
}  // This is where we are creating and returning a token



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
       const token = createToken(user._id) // We are passing the id from the database
       res.cookie('jwt', token , {httpOnly: true, maxAge:maxAge*1000}) //Sending the token in the cookie
       res.status(201).json({user: user._id}) // sending the user object as a json file


    } catch(err){
        const errors = handleErrors(err)
        res.status(400).json({errors}) // We are sending a json where the password property hold the password's error and email holds the email error
        
    }
    
}
module.exports.login_post = async (req,res) =>{
    const {email, password} = req.body
    try{
      const user = await User.login(email,password)
      const token = createToken(user._id) // We are passing the id from the database
      res.cookie('jwt', token , {httpOnly: true, maxAge:maxAge*1000}) //Sending the token in the cookie
      res.status(200).json({user: user._id})
    }
    catch(err){
    const errors = handleErrors(err)
    res.status(400).json({ errors})
    }
    
}
