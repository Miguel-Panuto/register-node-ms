import winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;
const { Console, File } = winston.transports;

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp(),
    printf(({ level, message, timestamp, data }) => `[${timestamp}] - ${level}: ${message} ${data ? '\n' + data : ''}`)
  ),
  transports: [
    new Console(),
    new File({ filename: './logs/error.log', level: 'error' }),
    new File({ filename: './logs/combined.log' }),
  ],
});

export default logger;
