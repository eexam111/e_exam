const session = require('express-session');
const MongoStore = require("connect-mongo");
require('dotenv').config();

const sessionStore = MongoStore.create({ 
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions' 
});

const sessionmiddleware = session({
    secret: 'man_and_women',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
});

module.exports = sessionmiddleware;
