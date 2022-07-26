import express from 'express';
import http from 'http';
import _ from 'lodash';
import db from '../db/index.js';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

io.on('connection', (socket) => {
  console.log({ 'socket.id': socket.id });
  socket.on('addPhone', async (phoneData, acknowledge = _.noop) => {
    const { phone } = phoneData;
    const { id } = await db.one('INSERT INTO phones(phone) VALUES($1) RETURNING id', [phone]);
    console.log(id);
    acknowledge({ status: 'ok' });
    io.emit('addPhone', { id, phone });
  })
})


const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));
