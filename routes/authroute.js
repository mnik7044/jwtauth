const express = require('express') 

const controller = require('../controllers/authcont') // Importing the controller

const router = express.Router() // We are creating an instance of Router

router.get('/signup', controller.signup_get) // In place of function taking the function from the controller file
router.post('/signup', controller.signup_post)
router.get('/login', controller.login_get)
router.post('/login',controller.login_post)


module.exports = router