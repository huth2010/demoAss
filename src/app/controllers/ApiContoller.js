const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
const { mongoosetoObject, mutipleMongoosetoObject } = require('../../util/mongoose');
var passport = require('passport');// Import thư viện passport
require('../../config/token/Passport')(passport); // Gọi hàm khởi tạo passport với tham số là passport
var jwt = require('jsonwebtoken');// Import thư viện jsonwebtoken (JWT)
const session = require('express-session');


class ApiController {
  
}

module.exports = new MeController();
