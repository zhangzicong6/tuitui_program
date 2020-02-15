var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const requestIp = require('request-ip');

var index = require('./routes/index');
var users = require('./routes/users');
var adzone = require('./routes/adzone');
var tuiguang = require('./routes/tuiguang');
var transfer = require('./routes/transfer');
var mp = require('./routes/miniProgram');
var alipayLink = require('./routes/alipayLink');
var novelTransfer = require('./routes/novelTransfer');
var recommend = require('./routes/recommend');
//var materials = require('./routes/materials');
var material_domain = require('./conf/proj.json').material_domain;
var zsy = require('./routes/zsy');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view cache', true);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(requestIp.mw())

app.use(function(req, res, next) {
   //console.log('---hostname----')
   //console.log(req.hostname)
  if(req.hostname == material_domain){
  	if(req.url.indexOf('/materials')!=-1){
  		next()
  	}else{
  		res.send({message:'功能正在开发'})
  	}
  }else{
  	//console.log('----next routes-------')
  	next()
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/adzone',adzone);
app.use('/tuiguang',tuiguang);
app.use('/transfer',transfer);
app.use('/miniprogram',mp);
app.use('/alipayLink',alipayLink);
app.use('/novel_transfer',novelTransfer);
app.use('/recommend',recommend);
app.use('/zsy',zsy);

//app.use('/materials',materials);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


