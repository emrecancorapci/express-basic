import Express from 'express';

import authRouter from './routes/authRouter.js';
import usersRouter from './routes/usersRouter.js';

import notFoundMiddleware from './middlewares/not-found.js';

const app = Express();

app.use(Express.json());
app.use(Express.static('./public'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);

app.use(notFoundMiddleware);

export default app;
