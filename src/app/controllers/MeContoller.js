const Course = require('../models/Course');
const { mongoosetoObject, mutipleMongoosetoObject } = require('../../util/mongoose');
class MeContoller {
  // GET /me/stored/courses
  storedCourses(req, res, next) {
   
    let courseQuery=Course.find({})
    //Course.find({}).then((courses)=>res.send(courses));


    if(req.query.hasOwnProperty('_sort')){
      courseQuery=courseQuery.sort({
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

  // GET /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({}).then(courses => res.render('me/trashCourses', {
      courses: mutipleMongoosetoObject(courses)
    })).catch(next)
  }
}

module.exports = new MeContoller();
