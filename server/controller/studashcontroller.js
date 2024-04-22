const Schedule = require('../models/schedule');
const Notice = require('../models/notice');
const MCQ = require('../models/mcq');
const Result = require('../models/result');
const Request = require('../models/request');
const requireauth = require('../middleware/studentauth');

/**
 * GET /
 * Student_dashboard
 */
exports.studash = async (req, res) => {
  try {
    const scheduleData = await Schedule.find({ user: req.user._id });
    const locals = {
      title: "Student Dashboard - E-Exam",
      description: "Exam Arrangement System",
      scheduleData: scheduleData 
    };

    res.render('student_dashboard', { locals, layout: '../views/layouts/student_dashboard' });
  } catch (error) {
    console.error('Error fetching schedule data:', error);
    res.status(500).send('Internal server error');
  }
};

/**
 * GET /
 * Community
 */
exports.community = async (req, res) => {
  const locals = {
    title: "Community - E-Exam",
    description: "Exam Arrangement System",
  }
  res.render('community', {locals,layout:'../views/layouts/student_dashboard'});
};
/**
 * GET /
 * Student Notice
 */
exports.snotice = async (req, res) => {
  try {
    const notices = await Notice.find();
    const locals = {
      title: "Student Notice - E-Exam",
      description: "Exam Arrangement System",
      notices: notices,
      layout:'../views/layouts/student_dashboard'
    };
   
    res.render('student_notice', locals); 
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).send('Internal server error');
  }
};

/**
 * GET /
 * Schedule
 */
exports.schedule = async (req, res) => {
  const locals = {
    title: "Schedule - E-Exam",
    description: "Exam Arrangement System",
  }
  res.render('schedule', {locals,layout:'../views/layouts/student_dashboard'});
};

exports.mcqerr = async (req, res) => {
  const locals = {
    title: "MCQ ERROR - E-Exam",
    description: "Exam Arrangement System",
  }
  res.render('error/mcq_error', {locals,layout:'../views/layouts/student_dashboard'});
};

exports.guide = async (req, res) => {
  try {
    const userName = req.session.username;
    const requests = await Request.find({ userName });

    const locals = {
      title: "Guideline - E-Exam",
      description: "Exam Arrangement System",
      requests: requests.map(request => ({
        question: request.question,
        adminResponse: request.adminResponse,
        status: request.status
      })),
      layout: '../views/layouts/student_dashboard'
    };
    res.render('student_guide', locals);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).send('Internal server error');
  }
};

exports.sendRequest = async (req, res) => {
  try {
    const { question } = req.body;
    const userName = req.session.username;
    const newRequest = new Request({
      userName: userName,
      question: question
    });
    await newRequest.save();
    res.redirect('/student_guide?success=true');
  } catch (error) {
    console.error('Error sending request:', error);
    res.status(500).send('Internal server error');
  }
};



exports.saveSchedule = async (req, res) => {
  const { time, notes } = req.body;

  try {
    const currentUser = req.user;
    const schedule = new Schedule({ time, notes, user: currentUser._id });
    await schedule.save();
    res.redirect('/student_dashboard');
  } catch (error) {
    console.error('Error saving schedule data:', error);
    res.status(500).send('Internal server error');
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).send('User not authenticated');
    }
    await Schedule.deleteMany({ user: req.user._id });
    res.status(204).send(); 
  } catch (error) {
    console.error('Error deleting schedule data:', error);
    res.status(500).send('Internal server error');
  }
};


/**
 * GET /
 * student mcq
 */

exports.studmcq = async (req, res) => {
  try {
      const mcqTests = await MCQ.find({}, 'name');

      res.render('student_mcq', { mcqTests, layout:'../views/layouts/student_dashboard'});
  } catch (error) {
      console.error('Error rendering student MCQ page:', error);
      res.status(500).send('Internal server error');
  }
};

exports.mcqAttend = async (req, res, next) => {
  try {
    const mcqTest = await MCQ.findById(req.params.id);
    if (!mcqTest) {
      return res.status(404).send('MCQ Test not found');
    }
    const username = req.session.username;
    res.render('mcq_attend', { mcqTest, username, layout: '../views/layouts/mcq'});
  } catch (error) {
    console.error('Error fetching MCQ test:', error);
    res.status(500).send('Internal server error');
  }
};



exports.submitMCQTest = async (req, res) => {
  try {
    const { testId, userName } = req.body;
    const answers = req.body;

    const existingResult = await Result.findOne({ testId: testId, userName: userName });
    if (existingResult) {
      
      return res.redirect('/mcq_error');
    }
    const mcqTest = await MCQ.findById(testId);

    if (!mcqTest) {
      return res.status(404).send('MCQ Test not found');
    }
    let correctAnswers = 0;
    for (let i = 0; i < mcqTest.questions.length; i++) {
      const correctOptionIndex = parseInt(mcqTest.questions[i].correctAnswer.replace('option', '')) - 1;
      const userAnswer = answers[`answer${i}`];

      if (userAnswer === mcqTest.questions[i].options[correctOptionIndex]) {
        correctAnswers++;
      }
    }
    const result = new Result({
      testId: testId,
      userName: userName,
      totalQuestions: mcqTest.questions.length,
      correctAnswers: correctAnswers
    });
    await result.save();
    res.redirect('/student_dashboard');
  } catch (error) {
    console.error('Error submitting MCQ test:', error);
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
