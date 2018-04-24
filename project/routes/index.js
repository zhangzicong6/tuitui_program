var express = require('express');
var router = express.Router();
var taokouling_conf = require('../conf/taokouling.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/action/:index',function(req,res,next){
	res.render('action/index',{index:req.params.index});
});
router.get('/zhangshi/:index',function(req,res,next){
	res.render('good/zhangshi',{index:req.params.index});
})
router.get('/goods/:index',function(req,res,next){
	res.render('good/index',{index:req.params.index});
})

router.get('/get_code',function(req,res,next){
	var num = parseInt(req.query.num);
	var token = taokouling_conf[''+num]
	res.send({code:token});
});



module.exports = router;
