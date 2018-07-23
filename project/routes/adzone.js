var express = require('express');
var router = express.Router();
var VideoProgramModel = require('../model/VideoProgram.js');
var AdzoneTaoModel = require('../model/AdzoneTao.js');
var async = require('async');
var mem = require('../util/mem.js')

router.use('/get_video',function(req,res,next){
	var pro = req.query.pro?req.query.pro:'test_program';
	async.waterfall([
			function(callback){
				VideoProgramModel.findOne({program:pro},function(err,vp){
					if(!vp){
						vp = {program:pro,video_url:''};
					}else{
						vp = vp.toObject();
					}
					callback(null,vp);
				});
			},function(vp,callback){
				AdzoneTaoModel.findOne({},function(err,tao){
						if(tao){
							vp.hide_code = tao.content+tao.kouling;
						}else{
							vp.hide_code = '';
						}
						callback(null,vp)
					});
			}
		],function(error,vp){
			res.send(vp);
	});
	
});

router.use('/get_kouling',function(req,res,next){
	res.header("Access-Control-Allow-Credentials", true)
	res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
	mem.get('taobao_qun_kouling').then(function(value){
		var arr;
		if(value){
			arr = value.split(',');
		}else{
			arr = require('../conf/taobao_qun.json').koulings;
			mem.set('taobao_qun_kouling',arr.join(','),1000*60*5).then(function(){})
		}
		var index =parseInt(arr.length*Math.random())
  		var c_mua = arr[index];
  		res.send({status:'success',text:c_mua});
	});
});

module.exports = router;