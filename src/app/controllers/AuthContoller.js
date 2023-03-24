const User = require('../models/User');
const { mongoosetoObject, mutipleMongoosetoObject } = require('../../util/mongoose');
class AuthContoller {
  // GET /me/stored/courses
login(req,res,next){
    res.render('authtification/login');
}
 
}

module.exports = new AuthContoller();
