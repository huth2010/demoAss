function checkAdminRole(req,res,next) {
    // Kiểm tra giá trị của res.locals.role
    if (req.locals.role === "admin") {
      return res.locals.permisson=true;
    } else {
      return res.locals.permisson=false;
    }
    next()
  }
  module.exports=checkAdminRole