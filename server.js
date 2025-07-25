const io = require('socket.io')(3000, {
    cors: {
        origin: "*", // ou "*" para qualquer origem (não recomendado em produção)
        methods: ["GET", "POST"]
    }
});
const users = {}

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })

    socket.on('send-file', data => {
        socket.broadcast.emit('file-message', data);
    });


    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconected', users[socket.id])
        delete users[socket.id]
    })

})
