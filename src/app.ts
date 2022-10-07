import express from 'express';
import 'express-async-errors';
import routes from './routes/routes';
import errorHandler from './middlewares/error';

const app = express();

app.use(express.json());
app.use(routes);

app.use(errorHandler);

export default app;
