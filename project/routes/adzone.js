var express = require('express');
var router = express.Router();
var VideoProgramModel = require('../model/VideoProgram.js');
var AdzoneTaoModel = require('../model/AdzoneTao.js');
var async = require('async');
var mem = require('../util/mem.js');
var crypto=require('crypto');
var md5=crypto.createHash("md5");
var http=require('http');

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

    mem.get('taobao_qun_kouling_set').then(function(val){
    	if(!val){
    		mem.get('taobao_qun_kouling').then(function(value){
				var arr;
				if(value){
					arr = value.split(',');
					var index =parseInt(arr.length*Math.random())
			  		var c_mua = arr[index];
			  		return res.send({status:'success',text:c_mua});
				}else{
					var date_now = parseInt(Date.now()/1000);
					var sign = '2369f38a58c449ccb542e258e2069c06types=all&tm='+date_now+'&v=1.0&zones=all2369f38a58c449ccb542e258e2069c06';
					md5.update(sign);
					sign = md5.digest('hex');
					var url = 'http://open.xuanwonainiu.com/pwd/take?types=all&tm='+date_now+'&v=1.0&zones=all&sign='+sign;
					http.get(url,function(rq,rs){
						var body='';
						rq.on('data',function(data){
							body+=data;
						});
						rq.on('end',function(){
							var res_data = JSON.parse(body);
							arr = res_data.data.pwds;
							mem.set('taobao_qun_kouling',arr.join(','),60).then(function(){})
							var index =parseInt(arr.length*Math.random())
					  		var c_mua = arr[index];
					  		return res.send({status:'success',text:c_mua});
						});
					})
				}
			});
        }else{
        	return res.send({status:'success',text:''});
        }
    })
});

router.use('/set_kouling',function(req,res,next){
	var set = req.query.set;
	if(set == 'true'){
		mem.set('taobao_qun_kouling_set','',30*24*60*60).then(function(){})
	}else{
		mem.set('taobao_qun_kouling_set','pause',30*24*60*60).then(function(){})
	}
	return res.send({status:'success'});
})

module.exports = router;