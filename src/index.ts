import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

import app from './App';
import logger from './utils/logger';
import { v1API } from './services/api';
import { MongoORM, MySQLORM } from './db';
import Redis from './services/redis';
import { authRouter } from './routes';
import { AuthorizationMiddleware } from './middlewares';
import './helpers/env';

const server = app.express;
const router = app.router;

// Config Cors Options
const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};

// Middleware Config For Server
router.use(cors(options));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.setStatic('public');

// DB Listening
MongoORM.connect();
MySQLORM.connect();

/**
 * Router
 **/
const authorizationMiddleware = AuthorizationMiddleware.getInstance();

server.use(authorizationMiddleware.checkAuth);

const v1 = v1API(server);

v1.setRouter(authRouter);

// Serve Listening
const port = process.env.PORT || 3000;

// Run Redis
const redisClient = Redis.getInstance();
redisClient.excecute();

server.listen(port, (err: string) => {
  if (err) {
    logger({ type: 'Error', message: `Server is Error ${err}` });
  }
  logger({ type: 'Info', message: `server is listening on ${port}` });
});
