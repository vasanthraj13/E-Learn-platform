const { Router } = require('express');
const { addCourse, deleteCourse, getCourses, updateCourse } = require('../controllers/course.controller')

const multer = require('multer')
const upload = multer({dest : '../uploads/'})
const router = Router();

router.route('/').get(getCourses).post(upload.single('video'), addCourse)
router.route('/:id').delete(deleteCourse).put(updateCourse)

module.exports = router;