import winston from 'winston';

const { combine, timestamp, json } = winston.format;
const { Console, File } = winston.transports;

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [
    new Console(),
    new File({ filename: './logs/error.log', level: 'error' }),
    new File({ filename: './logs/combined.log' }),
  ],
});

export default logger;
