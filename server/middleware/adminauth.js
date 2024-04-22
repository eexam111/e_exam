// adminAuth.js
const requireAdminAuth = (req, res, next) => {
    if (req.session && req.session.adminId) {
        next();
    } else {
        res.redirect('/admin_login'); 
    }
};

module.exports = requireAdminAuth;
