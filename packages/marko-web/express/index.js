const { buildRequestHeaders } = require('@base-cms/tenant-context');
const cookieParser = require('cookie-parser');
const express = require('express');
const marko = require('marko/express');
const path = require('path');
const helmet = require('helmet');
const apollo = require('./apollo');
const embeddedMedia = require('./embedded-media');
const loadObject = require('./load-object');
const loadDocument = require('./load-document');
const oembed = require('./oembed');
const rss = require('./rss');
const loadMore = require('./load-more');
const sitemaps = require('./sitemaps');
const { version } = require('../package.json');
const websiteContext = require('./website-context');
const CoreConfig = require('../config/core');
const SiteConfig = require('../config/site');

module.exports = (config = {}) => {
  const {
    rootDir,
    tenantKey,
    siteId,
    sitePackage,
  } = config;
  const distDir = path.resolve(rootDir, 'dist');
  const app = express();
  const serverDir = path.resolve(rootDir, 'server');

  // Add async block error handler.
  app.locals.onAsyncBlockError = config.onAsyncBlockError;

  // Register global document, components and fragments.
  app.locals.components = loadObject(config.components);
  app.locals.fragments = loadObject(config.fragments);
  app.locals.document = loadDocument(config.document);

  // Add cookie parsing
  app.use(cookieParser());

  // Add helment
  if (config.helmetConfig !== false) {
    app.use(helmet({
      ...config.helmetConfig,
      frameguard: false,
    }));
  }

  // Set the core config.
  app.locals.config = new CoreConfig({ ...config.coreConfig, distDir });

  // Set the website config to the app.
  app.locals.site = new SiteConfig(config.siteConfig);

  // Apply embedded media handlers.
  embeddedMedia(app, config.embeddedMediaHandlers);

  // Apply request origin.
  app.use((req, res, next) => {
    res.locals.requestOrigin = `${req.protocol}://${req.get('host')}`;
    next();
  });

  // Apply versions.
  app.use((req, res, next) => {
    res.set('x-version', `${sitePackage.version}|${version}`);
    next();
  });

  // Register apollo.
  const headers = buildRequestHeaders({ tenantKey, siteId });
  apollo(app, config.graphqlUri, { name: sitePackage.name, link: { headers } });

  // Set website context.
  app.use(websiteContext(app.locals.config));

  // Register the Marko middleware.
  app.use(marko());

  // Serve static assets
  app.use('/dist/css', express.static(`${distDir}/css`, { maxAge: '2y', immutable: true }));
  app.use('/dist/js', express.static(`${distDir}/js`, { maxAge: '2y', immutable: true }));
  app.use('/dist', express.static(distDir));

  // Register public files.
  app.use(express.static(path.join(serverDir, 'public')));

  // Register load more.
  loadMore(app);

  // Register sitemaps.
  sitemaps(app, headers);

  // Register RSS Feeds.
  rss(app, headers);

  // Register oEmbed
  oembed(app);

  return app;
};