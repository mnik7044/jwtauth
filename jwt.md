JWT stands for json web tokens // Also known as stateless

It is one way to implement authentication, it is very flexible too.

Advantages: 

Memory  less as because all the data is stored on user side as tokens
Serverless architecture support
Currently used

Disadvantage:

Less secure in comparison to session 
Also the tokens can be used by hackers
Usders pe access utna nahi hota


Mongoose Hooks

They are certain events that happen after some certaon part of the databsse
example deleting database se koi events fire hoga, creating se kuch fire hoga nd so on


Cookies
On the server we can access this Cookies
 csrf(cross site request forgery) mitigation property

Basic and easy way to work with Cookies


app.get('/set-cookies', (req,res) => {
  res.setHeader('Set-Cookie', 'newUser=true') // Setting up the cookies, we can acces the cookie using document.cookies(In the browser)
  res.send('You got the cookies')


})


We have a much easier way to work with cookies which is by using an external package called cookie-parser

After requiring the package and usinh it as a middlware using this code 

app.use(cookieParser())

We can use it by just using the code

res.cookie('newUser', false) // Here first parameter is the identifier and the second parameter is the value of the cookie'


Here comes the third argument, which is an object where we can specify different properties

ExAMPLE:   res.cookie('isEmployee', true, {maxAge: 1000*60*60*24}) 

Here maxAge is in milliseconds.
Rememeber defalt wala session hota so this is overwriting it
cookie overview
//cookies
app.get('/set-cookies', (req,res) => {
  // res.setHeader('Set-Cookie', 'newUser=true') // Setting up the cookies, we can acces the cookie using document.cookies(In the browser)
  
  res.cookie('newUser', false) // If the cookie currently exists, then it will update it if not then will create it
  
  res.cookie('isEmployee', true, {maxAge: 1000*60*60*24, secure:true, httpOnly: true}) 

  res.send('You got the cookies')


}) 

app.get('/read-cookies', (req,res)=>{

 const cookies = req.cookies
 console.log(cookies.newUser)

 res.json(cookies)

})

As we are using the cookie package we can access/read the cookies using req.cookie anywhere.

SignUp Method

After the user gives the email & password, we need to do 2 things
1. First of all we need to hash their password
a. We hashed the password using the presaved hook in mongoose and we r gonna save it in the database
2. Instantly log the user into the website(create a jwt for them)
we need to log in the user once the document is created in the database, to do that we can create a jwt attach it to the folder and send it to the browser 
and for as long as the cookie remains untouched the user remains logged in.

Different psrt of jwt
1- Header - It can be considered as the meta data for the token.
2- Payload - Data encoded into jwt. user id to identify the user whhen this is decoded we know which user is logged in
3- Signature-
This is created in the server and sent to the browser and stored inside the cookies 

What we are doing till now till the signup process?
Once the user credential is send to the server by clicking the signup button we handle it using post request, we hash the password first of all and save the user to the database
After that is done we create a json web token put in a cookie and send it to the browser
Ultimately this cookies, jwts are gonna get send to the servers for every request we make 


// Logging users in

How do we do that?

First of all we will take the credentials and will look for that user in the database.
Once we have got that user, we have to compare the hashed password, first of all we take the password, hash it and then will match it to the hashed password in our database in respect to that user, for the user with that email. If they match it means the password is correct and we can log them in create jwt for them and send it back to the browser in cookies. If it dont match we will send them an error.

We need to check whether the mail is in db or not then we need to check whether the password is correct or n
ot