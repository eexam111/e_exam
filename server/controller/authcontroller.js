const bcrypt = require('bcrypt');
const User = require('../models/user');
const Admin = require('../models/admin'); 



exports.signup_success = async (req, res) => {
    try {
        const data = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email 
        };
        
        const existingUser = await User.findOne({ username: data.username });

        if (existingUser) {
            res.render('error/username_exists'); 
        } else {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);

            data.password = hashedPassword;

            await User.create(data);
            console.log('User registered successfully:', data);
            res.render('signup_success');
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.render('error/internal_server_error'); 
    }
};

exports.student_dashboard = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.render('error/username_not_found'); 
        } else {
            const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordMatch) {
                res.render('error/wrong_password'); 
            } else {
                req.session.userId = user._id;
                req.session.username = user.username;
                res.redirect('/student_dashboard');
            }
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.render('error/internal_server_error');
    }
};



exports.admin_dashboard = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ name: username }); 

        if (!admin) {
            res.render('error/username_not_found');
        }

        if (password !== admin.password) {
            res.render('error/wrong_password'); 
        }
        req.session.adminId = admin._id;
        req.session.username = admin.name; 
        res.redirect('/admin_dashboard'); 
    } catch (error) {
        console.error('Error logging in admin:', error);
        res.render('error/internal_server_error');
    }
};




