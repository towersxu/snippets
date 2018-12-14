/**
 * @keywords 跨域
 */

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  // intercept OPTIONS method
  if (req.method == 'OPTIONS' && req.originalUrl === '/upload') {
    res.sendStatus(200)
  } else {
    next()
  }
})