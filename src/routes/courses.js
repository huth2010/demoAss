const express=require('express');
const router=express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });


const courseContoller=require('../app/controllers/CourseContoller');
//CourseContoller.index
router.post('/handle-form-actions',courseContoller.handleFormActions)
router.get('/create',courseContoller.create);
router.post('/store', upload.single('img'),courseContoller.store);
router.get('/:id/edit',courseContoller.edit)
router.put('/:id',upload.single('img'),courseContoller.update)
router.delete('/:id',courseContoller.destroy)
router.delete('/:id/force',courseContoller.forceDestroy)
router.patch('/:id/restore',courseContoller.restore)
router.get('/:slug',courseContoller.show);
module.exports=router;