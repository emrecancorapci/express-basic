import dotenv from 'dotenv';

import app from './app.js';
import connectDb from './config/database.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDb(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
