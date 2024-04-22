const express = require('express');
const router = express.Router();
const studashcontroller = require('../controller/studashcontroller');
const requireauth = require('../middleware/studentauth')

router.get('/student_dashboard', requireauth,studashcontroller.studash);
router.get('/community', requireauth,studashcontroller.community);
router.get('/student_notice', requireauth,studashcontroller.snotice);
router.get('/schedule', requireauth,studashcontroller.schedule);
router.get('/student_mcq', requireauth,studashcontroller.studmcq);
router.get('/mcqattend/:id', requireauth, studashcontroller.mcqAttend);
router.get('/mcq_error', requireauth,studashcontroller.mcqerr);
router.get('/student_guide', requireauth,studashcontroller.guide);
router.get('/logout', studashcontroller.logout);


router.post('/mcqattend/:id/submit', requireauth, function(req, res) {
    studashcontroller.submitMCQTest(req, res);
});

router.post('/schedule', requireauth, function(req, res) {
    studashcontroller.saveSchedule(req, res);
});

router.post('/send_request', function(req, res) {
    studashcontroller.sendRequest(req, res);
});



router.delete('/schedule', requireauth, studashcontroller.deleteSchedule); 


module.exports = router;