import Express from 'express';
import 'express-async-errors';

import authRouter from './routes/authRouter.js';
import usersRouter from './routes/usersRouter.js';

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

const app = Express();

app.use(Express.json());
app.use(Express.static('./public'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
