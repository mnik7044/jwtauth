const cookieParser = require('cookie-parser') // This is kind of a middle ware
const express = require('express');
const mongoose = require('mongoose');
const authroute = require('./routes/authroute') // Requiring/Importing the routes
const { requireAuth } = require('./middleware/authMiddleware')


const app = express();


//Middlewares
app.use(express.static('public')); // Static middleware this where we can connect our styatic files like css to the browser
app.use(express.json()) // Takes json data and parses it to a javascript object(attaches it to request handler of that route) so that we can use it in code
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://test:test1234@cluster0.0elqhvr.mongodb.net/jwt-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => console.log('db connected'))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authroute) // Placing all of the routes 


app.listen(3002)