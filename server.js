const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Render sits behind a proxy — needed if you add rate limiting, logging by IP, etc. later
app.set('trust proxy', 1);

// Health check endpoint — Render (and most uptime monitors) pings this
app.get('/healthz', (req, res) => {
  res.status(200).send('ok');
});

// Serve everything in /public — index.html is served automatically at "/"
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html'],
}));

// Any unmatched route falls back to the main app (keeps things simple if you
// later add client-side routes). Comment this out if you'd rather return a
// real 404 for unknown paths.
app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Ops Command Center listening on port ${PORT}`);
});
