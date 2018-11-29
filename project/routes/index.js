var express = require('express');
var router = express.Router();
var taokouling_conf = require('../conf/taokouling.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{title:'hello world'});
});

router.get('/action/:index',function(req,res,next){
	res.render('action/index',{index:req.params.index});
});

router.get('/zhangshi/:index',function(req,res,next){
	res.render('good/zhangshi',{index:req.params.index});
});

router.get('/goods/:index',function(req,res,next){
	res.render('good/index',{index:req.params.index});
});

router.get('/step/:index',function(req,res,next){
	res.render('step/step',{index:req.params.index, title: taokouling_conf[req.params.index].title});
})

router.get('/get_code',function(req,res,next){
	var num = req.query.num;
	if (!num) {
		num = 'action'
	}
	var token = taokouling_conf[num].code
	res.send({code:token});
});

router.get('/shucheng/:index',function(req,res,next){
	var num = req.params.index, img = '';
	if (num == 1) {
		img = '222.gif'
	}
	if (num == 2) {
		img = '6.26-1.jpg'
	}
	if (num == 3) {
		img = '6.29-1.jpg'
	}
	if (num == 4) {
		img = '闺蜜蜜语.gif'
	}
	if (num == 5) {
		img = '乐摇摇IV.gif'
	}
	if (num == 6) {
		img = '拾点书屋.gif'
	}
	res.render('shucheng/shucheng',{img:img});
})

router.get('/gmmy/:index',function(req,res,next){
	var num = req.params.index, img = '';
	if (num == 1) {
		img = '6.24-1.jpg'
	}
	if (num == 2) {
		img = '6.25-1.jpg'
	}
	if (num == 3) {
		img = '6.25-2.jpg'
	}
	if (num == 4) {
		img = '6.25-13.jpg'
	}
	if (num == 5) {
		img = '6.26-2.jpg'
	}
	res.render('gmmy/gmmy',{img:img});
})

module.exports = router;
