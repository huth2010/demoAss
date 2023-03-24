const {engine}= require('express-handlebars');
const express = require('express')
const morgan=require('morgan')
const SortMiddleware=require('./app/middleware/SortMiddleware')
const methodOverride=require('method-override')
var path=require('path')
const app = express()//instan
const port = 8000
const route=require('./routes')
const db=require('./config/db/index')
//connect db
db.connect();

app.use(methodOverride('_method'));
//custom middleware
app.use(SortMiddleware);
//use body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//XMLHttpRequest, fech,axios ....
app.use(express.static(path.join(__dirname,'public')));
//http loger
//app.use(morgan('combined'))
// Template engine
app.engine('hbs', engine({
  extname: '.hbs',
  helpers:{
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
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'resources','view'));



route(app);

// 127.0.0.1 - localhost
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});