const User = require('../models/User');
const { mongoosetoObject, mutipleMongoosetoObject } = require('../../util/mongoose');
const { use } = require('../../routes/me');
const Jimp = require('jimp')
var passport = require('passport');// Import thư viện passport
require('../../config/token/Passport')(passport); // Gọi hàm khởi tạo passport với tham số là passport
var jwt = require('jsonwebtoken');// Import thư viện jsonwebtoken (JWT)
const session = require('express-session');

class AuthContoller {
  // GET /me/stored/courses
  show(req, res, next) {
    res.render('authtification/login');
  }
  async login(req, res, next) {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.sign(user.toJSON(), 'nodeauthsecret');
          req.session.token = token; // Lưu token vào session

          // Gửi thông tin người dùng vào res.locals để có thể truy cập từ file .hbs
          res.locals.user = {
            name: user.name,
            img: user.img
          };

          res.redirect(`/`);
        } else {
          res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
        }
      });
    }
  }


  ///////////
  show2(req, res, next) {
    res.render('authtification/signup');
  }
  async signup(req, res, next) {
    const { name, email, password } = req.body
    if (req.file !== null) {
      const imgPath = req.file.path
      const img = await Jimp.read(imgPath)
      const base64img = await img.getBase64Async(Jimp.MIME_PNG)
      User.create({
        name: name,
        email: email,
        password: password,
        img: base64img
      }).then(() => res.redirect((`/authtification/show`))).catch(next)
    }
  }

  ///////delete
  delete(req, res, next) {
    User.deleteOne({ _id: req.params.id }).then(() => res.redirect(`/me/users`)).catch(next)
  }
  ///////////edit
  show3(req, res, next) {
    User.findById(req.params.id).then(user => res.render('authtification/edit', {
      user: mongoosetoObject(user)
    })).catch(next)

  }
  async edit(req, res, next) {
    const { name, email, password } = req.body
    const user = await User.findById({ _id: req.params.id })
    user.name = name
    user.email = email
    user.password = password
    if (req.hasOwnProperty('file') && req.file !== null) {
      const imgPath = req.file.path
      const img = await Jimp.read(imgPath)
      const base64img = await img.getBase64Async(Jimp.MIME_PNG)
      user.img = base64img
    }
    await user.save().then(() => res.redirect(`/me/users`)).catch(next)
  }
  ///logout
  logout(req, res, next) {
    // Đăng xuất người dùng sử dụng Passport
    req.session.token = null; // Xóa token trong session (nếu bạn đang sử dụng session)
    res.redirect('/'); // Chuyển hướng về trang chủ hoặc trang đăng nhập
  }
}

module.exports = new AuthContoller();
