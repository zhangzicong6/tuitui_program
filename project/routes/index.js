var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index/:index',function(req,res,next){
	 res.render('action/index'+req.params.index);
});

module.exports = router;
