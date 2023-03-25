const User = require('../models/User');
const { mongoosetoObject, mutipleMongoosetoObject } = require('../../util/mongoose');
class AuthContoller {
  // GET /me/stored/courses
show(req,res,next){
    res.render('authtification/login');
}
login(req,res,next){
  const username = req.body.email;
const password = req.body.password;
User.findOne({ username: username, password: password }, function(err, user) {
  res.cookie('datauser',username);
  res.redirect((`/me/stored/courses`));
});
}
 
}

module.exports = new AuthContoller();
