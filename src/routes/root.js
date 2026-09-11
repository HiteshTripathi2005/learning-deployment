/**
 * Root route plugin
 * @param {import('fastify').FastifyInstance} fastify
 */
export default async function rootRoutes(fastify) {
  fastify.get(
    '/',
    {
      schema: {
        description: 'Hello World endpoint',
        tags: ['General'],
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
            required: ['message'],
          },
        },
      },
    },
    async (request, reply) => {
      return { message: 'Hello, Earth!' };
    }
  );
}
