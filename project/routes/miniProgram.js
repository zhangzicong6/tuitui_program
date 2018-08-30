var express = require('express');
var router = express.Router();
var MPModel = require('../model/MiniProgram.js');
var mem = require('../util/mem.js');
var async = require('async');

router.get('/', function (req, res, next) {
    mem.get('miniprogram').then(function (value) {
        if(value){
            value = JSON.parse(value)
            res.send(value)
        }else {
            var game_set = require('../conf/game_box.json');
            async.parallel([
                    function(callback){
                        MPModel.find({"isBanner":true,isShow:true},function(error,result){
                            callback(error,result);
                        })
                    },
                    function(callback){
                        MPModel.find({"isBanner":false,isShow:true},function(error,result){
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
})



module.exports = router;
