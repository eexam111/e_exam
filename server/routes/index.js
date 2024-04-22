const express = require('express');
const router = express.Router();
const maincontroller = require('../controller/maincontroller');
const authcontroller = require('../controller/authcontroller');
const socketcontroller = require('../controller/socketcontroller');


router.get('/', maincontroller.homepage);
router.get('/about', maincontroller.about);
router.get('/contact', maincontroller.contact);
router.get('/signup', maincontroller.signup);
router.get('/student_login', maincontroller.student_login);
router.get('/admin_login', maincontroller.admin_login);



router.post('/student_login', function(req, res) {
    authcontroller.student_dashboard(req, res);
});

router.post('/admin_login', function(req, res) {
    authcontroller.admin_dashboard(req, res);
});

router.post('/signup', function(req, res) {
    authcontroller.signup_success(req, res);
});



module.exports = router;