/**
 * GET /
 * Homepage 
*/
exports.homepage = async (req, res) => {
  const locals = {
    title: "E-Exam",
    description: "Exam Arrangement System",
  }
  res.render('home', {locals});
}
/**
 * GET /
 * About 
*/
exports.about = async (req, res) => {
  const locals = {
    title: "About - E-Exam",
    description: "Exam Arrangement System",
  }
  res.render('about', locals);
}
/**
 * GET /
 * Contact 
*/
exports.contact = async (req, res) => {
  const locals = {
    title: "Contact - E-Exam",
    description: "Exam Arrangement System",
  }
  res.render('contact', locals);
}
/**
 * GET /
 * Signup
*/
exports.signup = async (req, res) => {
  const locals = {
    title: "Signup - E-Exam",
    description: "Exam Arrangement System",
  }
  res.render('signup', locals);
}
/**
 * GET /
 * Student_Login
*/
exports.student_login = async (req, res) => {
  const locals = {
    title: "Student_Login - E-Exam",
    description: "Exam Arrangement System",
  }
  res.render('student_login', locals);
}
/**
 * GET /
 * Admin_Login
*/
exports.admin_login = async (req, res) => {
  const locals = {
    title: "Admin_Login - E-Exam",
    description: "Exam Arrangement System",
  }
  res.render('admin_login', locals);
}

