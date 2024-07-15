const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const loadSecrets = require('./load-secrets');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  if (!dev) {
    await loadSecrets();
  }

  await app.prepare();
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
})();