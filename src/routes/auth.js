// const express=require('express');
// const router=express.Router();
const multer=require('multer')
const upload = multer({ dest: 'uploads/' });
 const authContoller=require('../app/controllers/AuthContoller');
// //MeContoller.index
// router.get('/login',authContoller.login);
// //router.get('/signup',authContoller.signup);

// module.exports=router;
const express = require('express');
const router = express.Router();
const User = require('../app/models/User');

const bodyParser = require("body-parser")// Import thư viện body-parser để xử lý request có dạng json

// Parse các request có content-type là application/json
router.use(bodyParser.json());

const parser = bodyParser.urlencoded({ extended: true }); // Parse các request có content-type là application/x-www-form-urlencoded

router.use(parser); // Sử dụng body-parser để parse request có content-type là application/x-www-form-urlencoded


// GET login page
router.get('/show', authContoller.show)
//GET logout
router.get('/logout',authContoller.logout)
// POST login form
router.post('/login', authContoller.login)
// GET signup page
router.get('/show2', authContoller.show2)
// POST signup form
router.post('/signup',upload.single('img'), authContoller.signup)
// delete user
router.delete('/:id',authContoller.delete)
// edit
router.get('/:id/edit',authContoller.show3)
router.put('/:id',upload.single('img'),authContoller.edit)


module.exports = router;
