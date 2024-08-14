import express from "express";
import helmet from "helmet";
import router from './routes';
import { createServer } from "node:http";

const server = express();


server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true}));

server.use('/', router);

server.listen(3000, () => {
    console.log('Sevidor rodando no endereço http://localhost:3000');
});