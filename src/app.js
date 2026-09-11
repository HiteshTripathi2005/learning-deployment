import Fastify from 'fastify';
import cors from '@fastify/cors';
import { env } from './config/env.js';
import rootRoutes from './routes/root.js';
import statusRoutes from './routes/status.js';

/**
 * Fastify app factory
 * @param {import('fastify').FastifyServerOptions} opts
 * @returns {import('fastify').FastifyInstance}
 */
export async function buildApp(opts = {}) {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
    },
    ...opts,
  });

  // Enable Cross-Origin Resource Sharing
  await app.register(cors, {
    origin: true, // Allow all origins by default in boilerplate
  });

  // Register routes
  await app.register(rootRoutes);
  await app.register(statusRoutes);

  // Custom 404 handler
  app.setNotFoundHandler((request, reply) => {
    reply.status(404).send({
      statusCode: 404,
      error: 'Not Found',
      message: `Route ${request.method}:${request.url} not found`,
    });
  });

  // Custom global error handler
  app.setErrorHandler((error, request, reply) => {
    app.log.error(error);
    const statusCode = error.statusCode || 500;
    reply.status(statusCode).send({
      statusCode,
      error: error.name || 'Internal Server Error',
      message: error.message || 'An unexpected error occurred',
    });
  });

  return app;
}
