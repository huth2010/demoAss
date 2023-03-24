const Course = require('../models/Course');
const {mongoosetoObject}=require('../../util/mongoose');
class CourseContoller {
  // GET /courses/:slug
  show(req, res,next) {
    Course.findOne({slug: req.params.slug}).then(course=>{
      res.render('courses/show',{
        course: mongoosetoObject(course)
      });
    }).catch(next);
  }

  //// GET /courses/
  create(req,res,next){
    res.render('courses/create')
  }
  edit(req,res,next){
    Course.findById(req.params.id)
    .then(course => res.render('courses/edit',{
      course: mongoosetoObject(course)
    })).catch(next)
    
  }
   //// POST /store/
   store(req,res,next){
    //res.json(req.body);
    //const formData={...req.body};
    const course=new Course(req.body);
    course.save().then(()=>res.redirect(`/me/stored/courses`)).catch(next)
    
  }
  update(req,res,next){
    Course.updateOne({ _id: req.params.id},req.body).then(()=>res.redirect('/me/stored/courses')).catch(next);
  }

  destroy(req,res,next){
    Course.delete({_id: req.params.id}).then(()=>res.redirect('back')).catch(next);
  }
//[patch] /courses/:id/restore
  restore(req,res,next){
    Course.restore({_id: req.params.id}).then(()=>res.redirect('back')).catch(next);

  }
//
forceDestroy(req,res,next){
  Course.deleteOne({_id: req.params.id}).then(()=>res.redirect('back')).catch(next);

}
handleFormActions(req,res,next){
  switch(req.body.action){
    case 'delete':
      Course.delete({_id: {$in: req.body.courseIds}}).then(()=>res.redirect('back')).catch(next);
      break;
      default:
        res.json({message: 'Action invalid'})
  }
}
}


module.exports = new CourseContoller();

//middleware
//ý nghĩa
//phần mềm trung gian (đứng giữa các thành phần trong phần mềm)
//sau route thì tất cả tham số đều là middleware
//vai trò
//giống như bác bảo vệ
//1.kiểm soát (validate)
//2.cho phép vào (validation passed -> cho vao)
//3. không cho vào
//4. chỉnh sửa / thay đổi
//browser(client) <>=======req======== middleware(có thể có nhiều lớp) :server(node)
                                           //^  
//browser(client) <>========res=======server(node)
//ung dung: làm chức năng xác thực và phân quyền
//chia sẻ các giá trị của biến tới tất cả các view;
