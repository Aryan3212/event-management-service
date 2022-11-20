import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import "reflect-metadata";
import { router } from './routes/index.routes';
import log from './utils/logger';
import morgan from 'morgan';


dotenv.config();

const app: Express = express();
app.use(express.json())
app.use(morgan('dev'))
app.use(router);

app.get('/healthcheck', (req: Request, res: Response) => {
  return res.sendStatus(200).send('Express + TypeScript Server');
});

app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.log(err);
  return res.sendStatus(500);
});

export { app };