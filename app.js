require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const sessionmiddleware = require('./server/middleware/sessionmiddleware');
const socketcontroller = require('./server/controller/socketcontroller');
const http = require('http');
const socketIo = require('socket.io');
const expressSocketIoSession = require('express-socket.io-session');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);


const port = process.env.PORT || 3000;

app.use(sessionmiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Mongo connect
connectDB();

// Static Files
app.use(express.static('public'));

// Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');



io.use(expressSocketIoSession(sessionmiddleware, {
  autoSave: true
}));
// Initialize socket.io
socketcontroller.initializeSocket(io);

// Routes
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/studash'));
app.use('/', require('./server/routes/admdash'))
// Handle 404
app.get('*', function(req, res) {
  res.status(404).render('error/404', { layout:'../views/layouts/other' });
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
