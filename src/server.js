import { buildApp } from './app.js';
import { env } from './config/env.js';

async function startServer() {
  const app = await buildApp();

  try {
    const address = await app.listen({
      port: env.PORT,
      host: env.HOST,
    });
    app.log.info(`🚀 Server listening at ${address}`);
    app.log.info(`👉 Hello World API: ${address}/`);
    app.log.info(`👉 Server Status API: ${address}/status`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }

  // Graceful shutdown handling
  const signals = ['SIGINT', 'SIGTERM'];
  for (const signal of signals) {
    process.on(signal, async () => {
      app.log.info(`Received ${signal}. Closing HTTP server gracefully...`);
      try {
        await app.close();
        app.log.info('Server closed successfully.');
        process.exit(0);
      } catch (err) {
        app.log.error('Error during server shutdown', err);
        process.exit(1);
      }
    });
  }
}

startServer();
