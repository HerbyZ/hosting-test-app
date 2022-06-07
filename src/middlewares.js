function logRequestMiddleware(req, res, next) {
  console.log(
    `Request accepted: ${req.method} ${req.url}. Status code: ${res.statusCode}`
  );
  next();
}

module.exports = {
  logRequestMiddleware,
};
