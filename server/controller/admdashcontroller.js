const Notice = require('../models/notice');
const MCQ = require('../models/mcq');
const Result = require('../models/result')
const Request = require('../models/request');


/**
 * GET /
 * Admin_dashboard
*/
exports.admdash = async (req, res) => {
    const locals = {
      title: "Admin Dashboard - E-Exam",
      description: "Exam Arrangement System",
    }
    res.render('admin_dashboard', {locals,layout:'../views/layouts/admin_dashboard'});
  }

  /**
   * GET /admin_mcq
   * Admin MCQ page
   */
  exports.admcq = async (req, res) => {
      const locals = {
          title: "Admin Dashboard - E-Exam",
          description: "Exam Arrangement System",
      };
      res.render('admin_mcq', { locals, layout: '../views/layouts/admin_dashboard' });
  };
  

/**
 * GET /
 * Schedule
 */
exports.adschedule = async (req, res) => {
  const locals = {
    title: "Admin Schedule - E-Exam",
    description: "Exam Arrangement System",
  }
  res.render('admin_schedule', {locals,layout:'../views/layouts/admin_dashboard'});
};

exports.saveSchedule = async (req, res) => {
  const { time, notes } = req.body;

  try {
    const currentUser = req.admin;
    const schedule = new Schedule({ time, notes, admin: currentUser._id });
    await schedule.save();
    res.redirect('/admin_schedule');
  } catch (error) {
    console.error('Error saving schedule data:', error);
    res.status(500).send('Internal server error');
  }
};


exports.deleteSchedule = async (req, res) => {
  try {
    if (!req.admin || !req.admin._id) {
      return res.status(401).send('User not authenticated');
    }
    await Schedule.deleteMany({ user: req.admin._id });
    res.status(204).send(); 
  } catch (error) {
    console.error('Error deleting schedule data:', error);
    res.status(500).send('Internal server error');
  }
};


/**
 * GET /admin_option
 * Admin Result page
 */
exports.admresult = async (req, res) => {
  try {
      const allResults = await Result.find();
      const locals = {
          title: "Admin Dashboard - E-Exam",
          description: "Exam Arrangement System",
          results: allResults,
          layout: '../views/layouts/admin_dashboard'
      };
      res.render('result', locals); 
  } catch (error) {
      console.error('Error fetching all results:', error);
      res.status(500).send('Internal server error');
  }
};

exports.deleteAllResults = async (req, res) => {
  try {
      
      await Result.deleteMany({});

      res.send('All results deleted successfully');
  } catch (error) {
      console.error('Error deleting all results:', error);
      res.status(500).send('Internal server error');
  }
};

   /**
   * GET /admin_option
   * Admin Option page
   */
   exports.admcqo = async (req, res) => {
    const locals = {
        title: "Admin Dashboard - E-Exam",
        description: "Exam Arrangement System",
    };
    res.render('admin_option', { locals, layout: '../views/layouts/admin_dashboard' });
};

  /**
   * POST /admin/mcq
   * Add new MCQ
   */
  exports.addMCQ = async (req, res) => {
    const { testName, question, option, correctAnswer } = req.body;

    try {
        console.log('Request Body:', req.body);

        const mcq = new MCQ({
            name: testName, 
            questions: question.map((q, index) => ({
                question: q,
                options: option.slice(index * 4, index * 4 + 4),
                correctAnswer: correctAnswer[index]
            }))
        });

        await mcq.save();

        res.redirect('/admin_mcq');
    } catch (error) {
        console.error('Error adding MCQ:', error);
        res.status(500).send('Internal server error');
    }
};


exports.deleteAllMCQs = async (req, res) => {
  try {
      await MCQ.deleteMany({});
      
      res.send('All MCQs deleted successfully');
  } catch (error) {
      console.error('Error deleting all MCQs:', error);
      res.status(500).send('Internal server error');
  }
};


exports.anotice = async (req, res) => {
  try {
    const locals = {
      title: "Admin Notice - E-Exam",
      description: "Exam Arrangement System",
    };
    res.render('admin_notice', { locals, layout: '../views/layouts/admin_dashboard' });
  } catch (error) {
    console.error('Error rendering admin notice page:', error);
    res.status(500).send('Internal server error');
  }
};

exports.anotices = async (req, res) => {
  try {
    const { title, content } = req.body;
    const notice = new Notice({ title, content });

    await notice.save();

    res.redirect('/admin_notice');
  } catch (error) {
    console.error('Error saving admin notice:', error);
    res.status(500).send('Internal server error');
  }
};


exports.adminGuide = async (req, res) => {
  try {
    const requests = await Request.find({ status: 'pending' });

    const locals = {
      title: "Admin Guide - E-Exam",
      description: "Exam Arrangement System",
      requests: requests,
      layout: '../views/layouts/admin_dashboard'
    };
    res.render('admin_guide', locals);
  } catch (error) {
    
    console.error('Error rendering admin guide page:', error);
    res.status(500).send('Internal server error');
  }
};

exports.acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await Request.findByIdAndUpdate(requestId, { status: 'accepted' });
    const { userName, question } = request;

    const locals = {
      title: "Admin Guide - E-Exam",
      description: "Exam Arrangement System",
      request,
      user: userName,
      ques: question,
      layout: '../views/layouts/admin_dashboard'
    };

    res.render('admin_response', locals);
  } catch (error) {
    console.error('Error accepting request:', error);
    res.status(500).send('Internal server error');
  }
};

exports.sendResponse = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { adminResponse } = req.body;

    const request = await Request.findByIdAndUpdate(requestId, { adminResponse: adminResponse });

    res.redirect('/admin_guide');

  } catch (error) {
    console.error('Error sending response:', error);
    res.status(500).send('Internal server error');
  }
};

exports.rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    await Request.findByIdAndUpdate(requestId, { status: 'rejected' });
    res.redirect('/admin_guide');
  } catch (error) {
    console.error('Error rejecting request:', error);
    res.status(500).send('Internal server error');
  }
};

exports.showAdminResponseForm = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const request = await Request.findById(requestId);
    const { userName, question } = request;
    const locals = {
      title: "Admin Guide - E-Exam",
      description: "Exam Arrangement System",
      requests: request,
      user: userName,
      ques: question
    };
    res.render('admin_response_form', locals);
  } catch (error) {
    console.error('Error rendering admin response form:', error);
    res.status(500).send('Internal server error');
  }
};
/**
 * GET /
 * Logout
*/
exports.logout = async (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.error('Error destroying session:', err);
      } else {
          console.log('Session destroyed successfully');
          res.redirect('/');
      }
  });
}