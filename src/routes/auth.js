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
router.get('/login', authContoller.login);

// POST login form
router.post('/login', authContoller.login);

// GET dashboard page
// router.get('/dashboard', (req, res) => {
//   if (!req.session.userId) {
//     return res.redirect('/login');
//   }
//   res.render('dashboard');
// });

module.exports = router;
