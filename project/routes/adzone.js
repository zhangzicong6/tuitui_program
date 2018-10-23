var express = require('express');
var router = express.Router();
var VideoProgramModel = require('../model/VideoProgram.js');
var AdzoneTaoModel = require('../model/AdzoneTao.js');
var BannerModel = require('../model/Banner.js');
var async = require('async');
var mem = require('../util/mem.js');
var crypto=require('crypto');
var http=require('http');

var https = require("https");


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
			  		var qun_index = c_mua.indexOf("€");
			  		if(qun_index !=-1){
			  			c_mua = c_mua.substr(qun_index,c_mua.length);
			  		}
			  		return res.send({status:'success',text:c_mua});
				}else{
					var date_now = parseInt(Date.now()/1000);
					var sign = '2369f38a58c449ccb542e258e2069c06channel=c1&types=all&tm='+date_now+'&v=1.0&zones=all2369f38a58c449ccb542e258e2069c06';
					var md5=crypto.createHash("md5");
					md5.update(sign);
					sign = md5.digest('hex');
					var url = 'http://open.xuanwonainiu.com/pwd/take?channel=c1&types=all&tm='+date_now+'&v=1.0&zones=all&sign='+sign;
					console.log(url);
					http.get(url,function(rq,rs){
						var body='';
						rq.on('data',function(data){
							body+=data;
						});
						rq.on('end',function(){
							var res_data = JSON.parse(body);
							if(res_data.data){
								arr = res_data.data.pwds;
								mem.set('taobao_qun_kouling',arr.join(','),60).then(function(){}).catch(function (error) {//加上catch 
						          console.log(error);
						        });
								var index =parseInt(arr.length*Math.random())
						  		var c_mua = arr[index];
						  		var qun_index = c_mua.indexOf("€");
						  		if(qun_index !=-1){
						  			c_mua = c_mua.substr(qun_index,c_mua.length);
						  		}
						  		return res.send({status:'success',text:c_mua});
						  	}else{
						  		return res.send({status:'success',text:''});
						  	}
						});
					})
				}
			}).catch(function (error) {//加上catch 
	          console.log(error);
	        });
        }else{
        	return res.send({status:'success',text:''});
        }
    }).catch(function (error) {//加上catch 
	          console.log(error);
	        })
});

router.use('/set_kouling',function(req,res,next){
	var set = req.query.set;
	if(set == 'true'){
		mem.set('taobao_qun_kouling_set','',30*24*60*60).then(function(){}).catch(function (error) {//加上catch 
					          console.log(error);
					        });
	}else{
		mem.set('taobao_qun_kouling_set','pause',30*24*60*60).then(function(){}).catch(function (error) {//加上catch 
					          console.log(error);
					        });
	}
	return res.send({status:'success'});
})


router.use('/get_kouling_js',function(req,res,next){
	res.header("Access-Control-Allow-Credentials", true)
	res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");

    async.waterfall([
    		function(callback){
    			return callback(null,"");
    			mem.get('taobao_qun_kouling_1').then(function(value){
    				if(value){
						arr = value.split(',');
						var index =parseInt(arr.length*Math.random())
				  		var c_mua = arr[index];
				  		var qun_index = c_mua.indexOf("€");
				  		if(qun_index !=-1){
				  			c_mua = c_mua.substr(qun_index,c_mua.length);
				  		}
				  		callback(null,c_mua);
				  	}else{
				  		callback(null,null);
				  	}
    			}).catch(function (error) {//加上catch 
		          console.log(error);
		        });
    		},
    		function(c_mua,callback){
    			return callback(null,"");
    			if(c_mua){
    				return callback(null,c_mua);
    			}
    			var date_now = parseInt(Date.now()/1000);
				var sign = '2369f38a58c449ccb542e258e2069c06channel=c2&types=all&tm='+date_now+'&v=1.0&zones=all2369f38a58c449ccb542e258e2069c06';
				var md5=crypto.createHash("md5");
				md5.update(sign);
				sign = md5.digest('hex');
				var url = 'http://open.xuanwonainiu.com/pwd/take?channel=c2&types=all&tm='+date_now+'&v=1.0&zones=all&sign='+sign;
				//console.log(url);
				http.get(url,function(rq,rs){
					var body='';
					rq.on('data',function(data){
						body+=data;
					});
					rq.on('end',function(){
						var res_data = JSON.parse(body);
						arr = res_data.data.pwds;
						mem.set('taobao_qun_kouling_1',arr.join(','),60).then(function(){}).catch(function (error) {//加上catch 
					          console.log(error);
					        });
						var index =parseInt(arr.length*Math.random())
				  		var c_mua = arr[index];
				  		var qun_index = c_mua.indexOf("€");
				  		if(qun_index !=-1){
				  			c_mua = c_mua.substr(qun_index,c_mua.length);
				  		}
				  		return callback(null,c_mua)
					});
				})
    		},
    		function(c_mua,callback){
    			return callback(null,"");
    			var url = 'http://ajax.aiwen520.com./jd/getkl?qd='+req.query.f+'&callback='+req.query.callback+'&h='+req.query.h+'&_time='+req.query._time
    			http.get(url,function(rq,rs){
					var body='';
					rq.on('data',function(data){
						body+=data;
					});
					rq.on('end',function(){
						var index= body.indexOf('(');
						body = body.substr(index+1,body.length-(index+2));
						var res_data = JSON.parse(body);
						res_data.text +=c_mua;
						var result = req.query.callback+'('+JSON.stringify(res_data)+')';
						callback(null,result)
					});
				})
    		}
    	],function(err,result){
    		if(err){
    			return res.send(err);
    		}
    		return res.send(result);
    });
    
});

router.use('/mxs_js',function(req,res,next){
	async.waterfall([
			function(callback){
    			mem.get('adzone_mxs_js').then(function(value){
    				callback(null,value);
    			}).catch(function (error) {//加上catch 
		          console.log(error);
		          callback(error,null)
		        });
    		},
    		function(value,callback){
    			if(value){
    				callback(null,JSON.parse(value));
    			}else{
    				BannerModel.findById('5b76aa2ac3ed4a4798d7045d',function(err,banner){
    					if(err){
    						callback(err,null)
    					}else{
    						mem.set('adzone_mxs_js',JSON.stringify(banner),60).then(function(){}).catch(function (error) {//加上catch 
					          console.log(error);
					        });
					        callback(null,banner);
    					}
    				})
    			}
    		},
		],function(err,result){
			if(!err){
				res.render('action/adzone',result)
			}
	})
});

router.use('/program',function(req,res,next){
	mem.get('12345_conf').then(function(value){
		var games;
		if(value){
			games = JSON.parse(value);
		}else{
			games = require('../conf/game_box.json');
			mem.set('12345_conf',JSON.stringify(games),10).then(function(){});
		}
		return res.send(games);
	});
});
router.use('/set_program',function(req,res,next){
	mem.set('12345_conf','',10).then(function(){});
});

router.get('/get_zkl_js',function(req,res,next){
	mem.get('get_zkl_js_liujiazhi',function(value){
		if(value){
			var text = 'get_zkl_js('+value+')';
			res.send(text)
		}else{
			var url = "https://alipay.yuchuantech.com/zkl/zkl.php?qudao=liujiazhi"
			https.get(url,function(rq,rs){
				var datas = [];  
		        var size = 0;  
				rq.on('data',function(data){
					datas.push(data);  
		            size += data.length;  
				});
				rq.on('end',function(){
					try{
						var buff = Buffer.concat(datas, size);  
			            //var result = iconv.decode(buff, "utf8");
			            var result = buff.toString();
			            var data = JSON.parse(result);
			            var zkl;
			            for (var key in data) {
			            	zkl = data[key].zkl
			            }
			            mem.set('get_zkl_js_liujiazhi',JSON.stringify(zkl),29).then(function(){});
						var text = 'get_zkl_js('+JSON.stringify(zkl)+')';
						res.send(text)
					}catch(e){
						console.log(e)
					}
					
				});
			})
		}
	})
})

module.exports = router;