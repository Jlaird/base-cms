require('marko/node-require');
const http = require('http');
const { createTerminus } = require('@godaddy/terminus');
const { isFunction: isFn } = require('@base-cms/utils');
const errorHandlers = require('./express/error-handlers');
const express = require('./express');

if (!process.env.LIVERELOAD_PORT) {
  process.env.LIVERELOAD_PORT = 4010;
}
const { env } = process;


// @todo Perhaps this should be configured...
process.on('unhandledRejection', (e) => { throw e; });

const startServer = async ({
  rootDir,
  siteConfig,
  coreConfig,
  port = env.PORT || 4008,
  exposedPort = env.EXPOSED_PORT || env.PORT || 4008,
  routes,
  graphqlUri = env.GRAPHQL_URI,
  tenantKey = env.TENANT_KEY,
  cdnImageHostname = env.CDN_IMAGE_HOSTNAME || 'base.imgix.net',
  cdnAssetHostname = env.CDN_ASSET_HOSTNAME || 'media.baseplatform.io',
  errorTemplate,

  // Terminus settings.
  timeout = 1000,
  signals = ['SIGTERM', 'SIGINT', 'SIGHUP', 'SIGQUIT'],
  healthCheckPath = '/_health',
  onSignal,
  onShutdown,
  onStart,
  onHealthCheck,
} = {}) => {
  if (!rootDir) throw new Error('The root project directory is required.');
  if (!graphqlUri) throw new Error('The GraphQL API URL is required.');
  const app = express({
    rootDir,
    siteConfig,
    coreConfig,
    graphqlUri,
    tenantKey,
    cdnImageHostname,
    cdnAssetHostname,
  });

  // Await required services here...
  if (isFn(onStart)) await onStart(app);

  // Load website routes.
  if (!isFn(routes)) throw new Error('A routes function is required.');
  routes(app);

  // Apply error handlers.
  errorHandlers(app, { template: errorTemplate });

  const server = http.createServer(app);

  createTerminus(server, {
    timeout,
    signals,
    // Add health checks of services here...
    healthChecks: {
      [healthCheckPath]: async () => {
        if (isFn(onHealthCheck)) return onHealthCheck();
        return { ping: 'pong' };
      },
    },
    onSignal: async () => {
      // Stop required services here...
      if (isFn(onSignal)) await onSignal();
    },
    onShutdown: async () => {
      if (isFn(onShutdown)) await onShutdown();
    },
  });

  return new Promise((res, rej) => {
    server.listen(port, function listen(err) {
      if (err) {
        rej(err);
      } else {
        res(this);
        if (process.send) {
          process.send({
            event: 'ready',
            name: coreConfig.siteName,
            graphqlUri,
            location: `http://0.0.0.0:${exposedPort}`,
          });
        }
      }
    });
  }).catch(e => setImmediate(() => { throw e; }));
};

module.exports = {
  startServer,
};
