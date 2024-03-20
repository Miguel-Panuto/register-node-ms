import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import swaggerUi from 'swagger-ui-express';

const swaggerJson = require('./swagger.json');

import { json } from 'express';
import morgan from 'morgan';
import { Logger } from 'winston';

export function startServer(container: Container) {
  const server = new InversifyExpressServer(container);
  const logger = container.get<Logger>('Logger');
  server.setConfig((app) => {
    app.use(json());
    app.use(morgan('combined', { stream: { write: (message) => logger.info(message) } }))
    app.use('/docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerJson, { swaggerOptions: { url: '/swagger.json' } })
    );
  });

  const port = process.env.PORT || 4568;
  server.build().listen(port, () => {
    logger.info(`Server started on PORT: ${port}`);
  });
}
