// Middleware to check if the user is authenticated
const requireauth = (req, res, next) => {
    if (req.session && req.session.userId) {
        req.user = { _id: req.session.userId }; 
        next();
    } else {
        res.redirect('/student_login'); 
        
    }
};

module.exports = requireauth;
