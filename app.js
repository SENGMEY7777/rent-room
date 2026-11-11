const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const env = require('./src/configs/env');
const routes = require('./src/routes/index');
const errorHandler = require('./src/middlewares/errorMiddleware');
const { apiLimiter } = require('./src/middlewares/rateLimiter');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', apiLimiter, routes);

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome to RentRoom-Backend REST API' });
});

app.use(errorHandler);

if (process.env.NODE_ENV !== 'production' || require.main === module) {
  const PORT = env.port || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
