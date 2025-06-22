const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);  // 👈 Dòng này KHỞI TẠO biến io

app.use(express.static(path.join(__dirname, 'public')));

// 👇 KHÔNG ĐƯỢC viết io.on trước dòng khởi tạo io!
io.on('connection', (socket) => {
  console.log('🟢 Ai đó vừa kết nối');

  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data);
  });

  socket.on('clear', () => {
    socket.broadcast.emit('clear');
  });

  socket.on('disconnect', () => {
    console.log('🔴 Người dùng rời khỏi');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🖌️ Server đang chạy tại: http://localhost:${PORT}`);
});
