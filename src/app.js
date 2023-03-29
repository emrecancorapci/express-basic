import Express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import rateLimiter from 'express-rate-limit';
import 'express-async-errors';

import authRouter from './routes/authRouter.js';
import usersRouter from './routes/usersRouter.js';

import authentication from './middleware/authentication.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

const app = Express();

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limits each IP to 100 request per windowMs
  })
);
app.use(Express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use(Express.json());
app.use(Express.static('./public'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authentication, usersRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
