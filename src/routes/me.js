const express=require('express');
const router=express.Router();

const meContoller=require('../app/controllers/MeContoller');
//MeContoller.index
router.get('/stored/courses',meContoller.storedCourses);
router.get('/trash/courses',meContoller.trashCourses);

module.exports=router;