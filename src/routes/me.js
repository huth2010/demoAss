const express=require('express');
const router=express.Router();
var passport = require('passport');// Import thư viện passport
require('../config/token/Passport')(passport); // Gọi hàm khởi tạo passport với tham số là passport
var jwt = require('jsonwebtoken');// Import thư viện jsonwebtoken (JWT)


const meContoller=require('../app/controllers/MeContoller');
//MeContoller.index
//router.use(passport.authenticate('jwt', { session: true }));
router.get('/stored/courses',meContoller.storedCourses);
router.get('/trash/courses',meContoller.trashCourses);
router.get('/users',meContoller.users);

module.exports=router;