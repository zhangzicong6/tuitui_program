var express = require('express');
var router = express.Router();
var MPModel = require('../model/MiniProgram.js');
var mem = require('../util/mem.js');
var async = require('async');
var http=require('http');

router.get('/', function (req, res, next) {
    mem.get('miniprogram').then(function (value) {
        if(value){
            value = JSON.parse(value)
            res.send(value)
        }else {
            var game_set = require('../conf/game_box.json');
            async.parallel([
                    function(callback){
                        MPModel.find({"isBanner":true,isShow:true}).sort({index:-1}).exec(function(error,result){
                            callback(error,result);
                        })
                    },
                    function(callback){
                        MPModel.find({"isBanner":false,isShow:true}).sort({index:-1}).exec(function(error,result){
                            callback(error,result);
                        })
                    }
                ],function(err,results){
                    console.log(err)
                    game_set.banners = results[0];
                    game_set.list = results[1];
                    mem.set('miniprogram',JSON.stringify(game_set),10).then(function(){});
                    res.send(game_set);
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
});

router.get('/kouling',function(req,res,next){
    var cb = 'jsonp'+parseInt(Math.random()*10000)
    var url = 'http://ajax.aiwen520.com./jd/getkl?qd=47&callback='+cb
    http.get(url,function(rq,rs){
        var body='';
        rq.on('data',function(data){
            body+=data;
        });
        rq.on('end',function(){
            var index= body.indexOf('(');
            body = body.substr(index+1,body.length-(index+2));
            var res_data = JSON.parse(body);
            res.send(res_data)
        });
    })
})



module.exports = router;
