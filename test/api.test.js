import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { buildApp } from '../src/app.js';

describe('Fastify Boilerplate API Tests', async () => {
  const app = await buildApp();

  test('GET / returns Hello World', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/',
    });

    assert.equal(response.statusCode, 200);
    const payload = response.json();
    assert.deepEqual(payload, { message: 'Hello, World!' });
  });

  test('GET /status returns healthy server status metrics', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/status',
    });

    assert.equal(response.statusCode, 200);
    const payload = response.json();
    assert.equal(payload.status, 'ok');
    assert.equal(typeof payload.timestamp, 'string');
    assert.equal(typeof payload.uptime.seconds, 'number');
    assert.equal(typeof payload.uptime.formatted, 'string');
    assert.equal(typeof payload.nodeVersion, 'string');
    assert.equal(typeof payload.memory.rssMb, 'number');
  });

  test('GET /health returns healthy server status (alias)', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health',
    });

    assert.equal(response.statusCode, 200);
    const payload = response.json();
    assert.equal(payload.status, 'ok');
  });

  test('GET /non-existent-route returns 404', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/non-existent-route',
    });

    assert.equal(response.statusCode, 404);
    const payload = response.json();
    assert.equal(payload.error, 'Not Found');
  });
});
