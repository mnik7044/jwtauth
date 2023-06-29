const express = require('express');
const mongoose = require('mongoose');
const authroute = require('./routes/authroute') // Requiring/Importing the routes



const app = express();


//Middlewares
app.use(express.static('public')); // Static middleware this where we can connect our styatic files like css to the browser
app.use(express.json()) // Takes json data and parses it to a javascript object(attaches it to request handler of that route) so that we can use it in code


// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://test:test1234@cluster0.0elqhvr.mongodb.net/jwt-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3002))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authroute) // Placing all of the routes 

