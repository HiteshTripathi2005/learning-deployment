# Fastify Boilerplate

A modern, lightweight, and production-ready Fastify boilerplate with a Hello World endpoint, comprehensive server status/health check API, native ES Modules (`"type": "module"`), and deployment support (Docker & cloud ready).

---

## 🚀 Features

- **Blazing Fast**: Powered by [Fastify](https://fastify.dev/), one of the fastest web frameworks for Node.js.
- **Native ES Modules**: Uses Node.js native ESM (`import` / `export`).
- **Zero Heavy Dev Tooling**: Built-in hot reloading using Node's native `--watch` flag (`npm run dev`).
- **Server Status / Health Check**: Full diagnostic API at `/status` (and `/health`) reporting uptime, memory usage, environment, and process information.
- **Hello World Endpoint**: Simple, validated root endpoint at `/`.
- **CORS Enabled**: Out-of-the-box `@fastify/cors` integration.
- **Graceful Shutdown**: Properly handles `SIGTERM` and `SIGINT` signals to close active connections cleanly without dropping requests during deployments.
- **Docker Ready**: Multi-stage minimal Alpine Dockerfile with non-root security standards.

---

## 📁 Project Structure

```
├── Dockerfile             # Multi-stage Docker deployment config
├── .dockerignore
├── .env.example           # Example environment variables
├── .env                   # Local environment variables (git-ignored)
├── .gitignore
├── package.json
├── README.md
└── src/
    ├── app.js             # Fastify app factory & plugin registration
    ├── server.js          # Server entry point & graceful shutdown
    ├── config/
    │   └── env.js         # Environment configuration parser
    └── routes/
        ├── root.js        # GET / (Hello World API)
        └── status.js      # GET /status & GET /health (Server status API)
```

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js >= 18 (Tested on Node.js 24)
- npm >= 9

### 2. Installation

Clone or navigate to the project directory and install dependencies:

```bash
npm install
```

### 3. Environment Configuration

Copy the example environment file if not already present:

```bash
cp .env.example .env
```

Available environment variables:
| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Port number the HTTP server listens on |
| `HOST` | `0.0.0.0` | IP interface to bind to (`0.0.0.0` for containers/deployments) |
| `NODE_ENV` | `development` | Environment mode (`development` or `production`) |
| `LOG_LEVEL` | `info` | Logging verbosity (`fatal`, `error`, `warn`, `info`, `debug`, `trace`) |

### 4. Running the Server

#### Development (Auto-reloads on file change)
```bash
npm run dev
```

#### Production
```bash
npm start
```

---

## 📡 API Endpoints

### 1. Hello World API
- **Route**: `GET /`
- **Response**: `200 OK`
```json
{
  "message": "Hello, World!"
}
```

### 2. Server Status / Health Check API
- **Route**: `GET /status` (or `GET /health`)
- **Response**: `200 OK`
```json
{
  "status": "ok",
  "message": "Server is healthy and running",
  "timestamp": "2026-09-11T06:45:00.000Z",
  "uptime": {
    "seconds": 124,
    "formatted": "2m 4s"
  },
  "environment": "development",
  "nodeVersion": "v24.5.0",
  "pid": 12345,
  "memory": {
    "rssMb": 42.15,
    "heapTotalMb": 12.34,
    "heapUsedMb": 8.76
  }
}
```

---

## 🐳 Docker Deployment

### Build the Image
```bash
docker build -t fastify-boilerplate .
```

### Run the Container
```bash
docker run -p 3000:3000 --env-file .env fastify-boilerplate
```
