'use strict';

function notFound(req, res, next) {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
}

function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' && status === 500
    ? 'Internal server error'
    : err.message;
  if (status >= 500) console.error(err);
  res.status(status).json({ error: message, ...(err.details && { details: err.details }) });
}

module.exports = { notFound, errorHandler };
