/**
 * favicon
 * 应用安全 CSP helmet
 * gizp压缩 compression
 * 限流 rateLimit
 * 跨域 cors
 */
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();

const PORT = parseInt(process.env.PORT || '', 10) || 8088;
const dev = process.env.NODE_ENV !== 'production';

console.log(`Node dev Environment is ${dev}`);

/**
 * 尽量在其他中间件前使用compression
 * 启用gzip
 */
app.use(compression({
  /*filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }

    //return compression.filter(req, res);
  },*/
  filter: function(req, res) {
    if (req.headers['x-no-compression']) {
      return false;
    }

    return (/html|text|json|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
  },
  threshold: 2048, // 阀值，当数据超过1kb的时候，可以压缩
  level: 9,
}));

app.use(favicon(path.join(process.cwd(), 'public', 'favicon.ico')));

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 限制時間 15 minutes
  max: 5, // 限制請求數量 limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later!',
});

app.use(limiter);

/**
 * 静态文件
 * https://expressjs.com/zh-cn/starter/static-files.html
 */
app.use(express.static('public'));

/**
 * 中间件
 */
app.use(helmet());

/**
 * 基本路由
 * https://expressjs.com/zh-cn/starter/basic-routing.html
 */
app.get('/', function(req, res, next) {
  res.send('Hello World!');
  /*console.log('the response will be sent by the next function ...');
  next();*/
}/*, function(req, res) {
  res.send('Hello from B!');
}*/);

app.get('/robots.txt', function(req, res) {
  res.send('/public/robots.txt');
});

/**
 * 处理 404 响应
 * https://expressjs.com/zh-cn/starter/faq.html
 */
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

/**
 * 错误处理
 * https://expressjs.com/zh-cn/starter/faq.html
 */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.on('uncaughtException', (err, origin) => {
  console.log(`捕获的异常: ${err}`);
  console.log(`异常的来源: ${origin}`);
});

app.on('error', (err) => {
  console.log(`error is ${err}`);
});

app.listen(PORT, (err) => {
  if (err) throw err;
  // @ts-ignore
  console.log(`> App is start on http://localhost:${PORT}`);
});

// @ts-ignore
process.on('uncaughtException', (err, origin) => {
  console.log(`捕获的异常: ${err}`);
  console.log(`异常的来源: ${origin}`);
});
