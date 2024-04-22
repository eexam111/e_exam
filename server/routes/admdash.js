const express = require('express');
const router = express.Router();
const admdashcontroller = require('../controller/admdashcontroller');
const requireAdminAuth = require('../middleware/adminauth');

router.get('/admin_dashboard', requireAdminAuth, admdashcontroller.admdash);
router.get('/admin_notice', requireAdminAuth, admdashcontroller.anotice);
router.get('/admin_mcq', requireAdminAuth, admdashcontroller.admcq);
router.get('/admin_option', requireAdminAuth, admdashcontroller.admcqo);
router.get('/result', requireAdminAuth, admdashcontroller.admresult);
router.get('/delete_mcq', requireAdminAuth, admdashcontroller.deleteAllMCQs);
router.get('/admin_guide', requireAdminAuth, admdashcontroller.adminGuide);
router.get('/admin_schedule',requireAdminAuth, admdashcontroller.adschedule);
router.get('/admin_response/:requestId', requireAdminAuth, admdashcontroller.showAdminResponseForm);
router.get('/logout', admdashcontroller.logout);

router.post('/admin/mcq', requireAdminAuth, function(req, res) {
    admdashcontroller.addMCQ(req, res);
});

router.post('/process_request/:requestId/accept', requireAdminAuth, function(req, res) {
    admdashcontroller.acceptRequest(req, res);
});

router.post('/admin_guide/:requestId/reply', requireAdminAuth, function(req, res) {
    admdashcontroller.sendResponse(req, res);
});

router.post('/process_request/:requestId/reject', requireAdminAuth, function(req, res) {
    admdashcontroller.rejectRequest(req, res);
});

router.post('/admin_notice', requireAdminAuth, function(req, res) {
    admdashcontroller.anotices(req, res);
});

router.post('/delete_results', requireAdminAuth, function(req, res) {
    admdashcontroller.deleteAllResults(req, res);
});


module.exports = router;
