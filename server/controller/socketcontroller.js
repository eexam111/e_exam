
const User = require('../models/user');

exports.initializeSocket = (io) => {
    io.on('connection', (socket) => {
        if (!socket.handshake.session.userId) {
            console.error('User not authenticated');
            return;
        }

        socket.userId = socket.handshake.session.userId;

        socket.on('chat message', async (msg) => {
            try {
                const user = await User.findById(socket.userId);
                if (user) {
                    const { username } = user;
                    const data = { username, message: msg };
                    io.emit('chat message', data);
                } else {
                    console.error('User not found for userId:', socket.userId);
                }
            } catch (error) {
                console.error('Error processing chat message:', error);
            }
        });
    });
};
