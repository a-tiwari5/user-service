const app = require('./app');
const config = require('./config/config');
const connectDB = require('./config/db');

let server;

connectDB().then(() => {
  server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port} in ${config.env} mode`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
