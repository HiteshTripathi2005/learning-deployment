import { env } from '../config/env.js';

/**
 * Server status & health check route plugin
 * @param {import('fastify').FastifyInstance} fastify
 */
export default async function statusRoutes(fastify) {
  const getStatusHandler = async (request, reply) => {
    const memory = process.memoryUsage();
    
    return {
      status: 'ok',
      message: 'Server is healthy and running',
      timestamp: new Date().toISOString(),
      uptime: {
        seconds: Math.floor(process.uptime()),
        formatted: formatUptime(process.uptime()),
      },
      environment: env.NODE_ENV,
      nodeVersion: process.version,
      pid: process.pid,
      memory: {
        rssMb: Math.round((memory.rss / 1024 / 1024) * 100) / 100,
        heapTotalMb: Math.round((memory.heapTotal / 1024 / 1024) * 100) / 100,
        heapUsedMb: Math.round((memory.heapUsed / 1024 / 1024) * 100) / 100,
      },
    };
  };

  const statusSchema = {
    description: 'Server status and health check endpoint',
    tags: ['Health'],
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          message: { type: 'string' },
          timestamp: { type: 'string' },
          uptime: {
            type: 'object',
            properties: {
              seconds: { type: 'number' },
              formatted: { type: 'string' },
            },
          },
          environment: { type: 'string' },
          nodeVersion: { type: 'string' },
          pid: { type: 'number' },
          memory: {
            type: 'object',
            properties: {
              rssMb: { type: 'number' },
              heapTotalMb: { type: 'number' },
              heapUsedMb: { type: 'number' },
            },
          },
        },
        required: ['status', 'timestamp', 'uptime', 'environment'],
      },
    },
  };

  // Status endpoint
  fastify.get('/status', { schema: statusSchema }, getStatusHandler);

  // Health check alias endpoint commonly used by cloud load balancers and orchestrators
  fastify.get('/health', { schema: statusSchema }, getStatusHandler);
}

/**
 * Format uptime seconds to human-readable string
 * @param {number} seconds
 * @returns {string}
 */
function formatUptime(seconds) {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const parts = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);

  return parts.join(' ');
}
