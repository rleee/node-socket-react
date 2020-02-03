const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

const index = require('./routes/index');

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      'https://api.darksky.net/forecast/b1a514349ffe8f4835699c44ecb993d6/43.7695,11.2558'
    );
    socket.emit('from-api', res.data.currently.temperature);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

let interval;
io.on('connection', socket => {
  console.log('new client connected');
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 10000);
  socket.on('disconnect', () => console.log('client disconnected'));
});

const port = process.env.PORT || 4001;
server.listen(port, () => console.log(`Listening on port ${port}`));
