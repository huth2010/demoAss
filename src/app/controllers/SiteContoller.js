const Course = require('../models/Course');
const {mutipleMongoosetoObject}=require('../../util/mongoose');
class SiteController {
  // [GET] /
  async index(req, res,next) {
    Course.find({}).then(courses => 
     { 
      res.render('home',{
        courses: mutipleMongoosetoObject(courses)
      });
    })
    .catch(error => next(error));
  }

  // GET /search
  search(req, res) {
    res.render('search');
  }
}

module.exports = new SiteController();
