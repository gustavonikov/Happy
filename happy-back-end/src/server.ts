import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';

import './database/connection';
import routes from './routes';
import { errorHandler } from './errors/handler';

const server = express();
const PORT = 8080;

server
    .use(cors())
    .use(express.json())
    .use(routes)
    .use('/uploads', express.static(path.join(__dirname,'..', 'uploads')))
    .use(errorHandler);

server.listen(8080, () => console.log('Server running on Port', PORT));
