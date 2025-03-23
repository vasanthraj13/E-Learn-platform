const { Router } = require('express');
const { courseEnroll, courseDeroll,getCourseEnrollbyid,getAllenroll  } = require('../controllers/courseEnrollment');

const router = Router();

router.route('/enroll').post(courseEnroll);
router.route('/deroll').post(courseDeroll)
router.route("/getallenroll").get(getAllenroll);
router.route('/getenroll').post(getCourseEnrollbyid )

module.exports = router;
