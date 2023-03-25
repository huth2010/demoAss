// const express=require('express');
// const router=express.Router();

 const authContoller=require('../app/controllers/AuthContoller');
// //MeContoller.index
// router.get('/login',authContoller.login);
// //router.get('/signup',authContoller.signup);

// module.exports=router;
const express = require('express');
const router = express.Router();
const User = require('../app/models/User');

// GET login page
router.get('/show', authContoller.show);

// POST login form
router.post('/login', authContoller.login);


module.exports = router;
