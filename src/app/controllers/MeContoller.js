const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
const { mongoosetoObject, mutipleMongoosetoObject } = require('../../util/mongoose');
var passport = require('passport');// Import thư viện passport
require('../../config/token/Passport')(passport); // Gọi hàm khởi tạo passport với tham số là passport
var jwt = require('jsonwebtoken');// Import thư viện jsonwebtoken (JWT)
const session = require('express-session');


class MeController {
  users(req, res, next) {
    if (req.session.token) { // Kiểm tra session có tồn tại token hay không
      User.find({}).then(users => res.render('me/storedUsers', {
        users: mutipleMongoosetoObject(users)
      })).catch(next)
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
  }

  // GET /me/stored/courses
  storedCourses(req, res, next) {
    let courseQuery = Course.find({})

    if (req.query.hasOwnProperty('_sort')) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type
      })
    }

    Promise.all([courseQuery, Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) => res.render('me/storedCourses', {
        deletedCount,
        courses: mutipleMongoosetoObject(courses)
      }))
      .catch(next)
  }
  //api
    apiStoredCourses(req, res, next) {
    Course.find({}).then(courses=>res.json(courses)) 
  }

  // GET /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({}).then(courses => res.render('me/trashCourses', {
      courses: mutipleMongoosetoObject(courses)
    })).catch(next)
  }
  //api
  apiUsers(req, res, next) {
    User.find({}).then(users=>res.json(users)) 
  }
}

module.exports = new MeController();
