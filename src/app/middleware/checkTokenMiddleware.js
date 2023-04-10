// Middleware
const checkTokenMiddleware = (req, res, next) => {
    // Kiểm tra nếu tồn tại req.session.token
    if (req.session.token) {
      // Đặt biến isAllow là true
      res.locals.isAllow = true;
    } else {
      // Nếu không tồn tại, đặt biến isAllow là false
      res.locals.isAllow = false;
    }
    // Chuyển tiếp sang middleware hoặc route tiếp theo
    next();
  };
  module.exports=checkTokenMiddleware