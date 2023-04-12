const {engine}= require('express-handlebars');
const express = require('express')
const SortMiddleware=require('./app/middleware/SortMiddleware')
const methodOverride=require('method-override')
var path=require('path')
const app = express()
const port = 3000
const route=require('./routes')
const db=require('./config/db/index')
const session = require('express-session');
const compression = require('compression');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const checkTokenMiddleware=require('./app/middleware/checkTokenMiddleware')
const checkAdminRole=require('./app/middleware/checkAdminRole')

//connect db
db.connect();

//
app.use(session({
  secret: 'nodeauthsecret', // Khóa bí mật để mã hóa session
  resave: false, // Không lưu lại session nếu không có thay đổi
  saveUninitialized: false, // Không lưu lại session chưa được khởi tạo
  // ...các tùy chọn khác...
}));


// Sử dụng middleware compression để nén dữ liệu gửi đi
app.use(compression());
app.use(methodOverride('_method'));
//custom middleware
app.use(SortMiddleware);
//use body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//XMLHttpRequest, fech,axios ....
app.use(express.static(path.join(__dirname,'public')));

// Thiết lập middleware của Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware để lấy thông tin user từ session
app.use((req, res, next) => {
  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  if (req.session && req.session.token) {
    try {
      // Giải mã token để lấy thông tin user
      const decoded = jwt.verify(req.session.token, 'nodeauthsecret');
      //req.user = decoded; // Lưu thông tin user vào req.user
      res.locals.user=decoded
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

// Middleware


// Template engine
app.engine('hbs', engine({
  extname: '.hbs',
  helpers:{
     eq : (a, b) => {
       a === b;
    },
    
    //role:()=>res.locals.role,
    user:()=> res.locals.user,
    isAllow: () => res.locals.isAllow,
    sum: (a,b)=>a+b,
    sortable: (field,sort)=>{
      const sortType=field===sort.column?sort.type:'default';
      const icons={
        default:'layers',
        asc:'arrow-up',
        desc:'arrow-down',
      };
      const types={
        default:'desc',
        asc:'desc',
        desc:'asc',
      }

      const icon=icons[sortType];
      const type=types[sortType];
      
      return `<a href="?_sort&column=${field}&type=${type}">
      <i data-feather="${icon}" width="16"></i></a>`
    }
  }
}));
//app.use(checkAdminRole)
app.use(checkTokenMiddleware);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'resources','view'));

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});
