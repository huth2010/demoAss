var JwtStrategy = require('passport-jwt').Strategy; // Sử dụng chiến lược JwtStrategy của Passport-JWT
var ExtractJwt = require('passport-jwt').ExtractJwt; // Sử dụng hàm ExtractJwt để lấy token từ header của request

var User=require('../../app/models/User') // Import model User để kiểm tra thông tin người dùng

module.exports = function(passport) { // Xuất module để sử dụng trong Passport
  var opts = {}; // Tạo đối tượng lưu trữ các tùy chọn cho JwtStrategy
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt"); // Lấy token từ header của request với scheme "jwt"
  opts.secretOrKey = "nodeauthsecret"; // 

  passport.use(new JwtStrategy(opts, async function(jwt_payload, done) { // Khởi tạo JwtStrategy với các tùy chọn đã định nghĩa
    let user = await User.findOne({id: jwt_payload.id}); // Tìm kiếm người dùng dựa trên id trong payload của token

    if (user) { // Nếu tìm thấy người dùng
        done(null, user); // Trả về người dùng
    } else {
        done(null, false); // Ngược lại, trả về false
    }
  }));
};
