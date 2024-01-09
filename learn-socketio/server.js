const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors')

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const user = []

app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/emit', (req, res) => {
  io.emit('chat message', 'Message from api')
  res.json({message: "From api"})
})

io.on('connection', (socket) => {
  let id = 1
  if (user.length > 0) {
    id = user[user.length - 1].id + 1
  }
  user.push({id, name: 'random'})
  io.emit('setid', id)
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('join chat', (msg) => {
    io.emit('join chat', msg);
  });

  socket.on('clear chat', () => {
    io.emit('clear chat')
  })
  socket.on('change name', (msg) => {
    io.emit('change name', msg)
  })
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Server listening on port 3000');
});