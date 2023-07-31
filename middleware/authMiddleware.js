
// We created this middleware which can be used before any route that we want to protect.


const jwt = require('jsonwebtoken')

const requireAuth = (req,res,next) =>{

    const token = req.cookies.jwt;

    // Check whether the jwt even exists or not
if(token)
{
    jwt.verify(token,'a secret string', (err,decodedToken) =>{  // we are using the inbuilt verify method of jwt to check the token

        if(err){
            console.log(err.message)
            res.redirect('/login')
        }
        else{
            console.log(decodedToken)
            next() // We are basically saying that if the token is verified carry on with whatever u were doing,which is viewing the protected routes
        }
    })
}
else{
    res.redirect('/login')
}

next()
}

module.exports = {requireAuth}