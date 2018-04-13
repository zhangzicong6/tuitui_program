var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/action/:index',function(req,res,next){
	 res.render('action/index'+req.params.index);
});

router.get('/get_code',function(req,res,next){
	res.send({code:'￥zEUZ0IYWcoe￥'})
});

module.exports = router;
