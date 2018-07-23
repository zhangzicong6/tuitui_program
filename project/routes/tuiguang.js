var express = require('express');
var router = express.Router();
var TuiGuangModel = require('../model/TuiGuang.js');
var mem = require('../util/mem.js')

router.get('/novel/:index', function(req, res, next) {
    mem.get('novel_'+req.params.index).then(function(value){
        if(value){
            console.log('---------get tuiguang value---------')
            console.log(value);
            console.log('------------------')
            var res_data = JSON.parse(value);
            res.render('tuiguang/tuiguang',res_data);
        }else{
            var selector = {id: req.params.index}
            TuiGuangModel.find(selector, function(err, data){
                if (err) {
                    console.log("Error:" + err);
                }
                else {
                    if (data != '') {
                        var res_data={
                            title: data[0].title,
                            headline: data[0].headline,
                            gonghao: data[0].gonghao,
                            author: data[0].author,
                            avator: data[0].avator,
                            content: data[0].content,
                            linkUrl: data[0].linkUrl,
                            statisticsUrl: data[0].statisticsUrl
                        }

                        mem.set('novel_'+req.params.index,JSON.stringify(res_data),60*1000).then(function(){
                             console.log('---------set novel value---------')
                        })
                        res.render('tuiguang/tuiguang',res_data);
                    } else {
                        res.send('没有查询到此链接，请先创建')
                    }
                }
            })
        }
    }).catch(function(err){
        console.log(err);
    });
})

router.get('/unjump/:index', function(req, res, next) {
    mem.get('unjump_'+req.params.index).then(function(value){
        if(value){
            console.log('---------get unjump value---------')
            console.log(value);
            console.log('------------------')
            var res_data = JSON.parse(value);
            res.render('tuiguang/unjump',res_data);
        }else{
            var selector = {id: req.params.index}
            TuiGuangModel.find(selector, function(err, data){
                if (err) {
                    console.log("Error:" + err);
                }
                else {
                    if (data != '') {
                        var res_data={
                            title: data[0].title,
                            headline: data[0].headline,
                            gonghao: data[0].gonghao,
                            author: data[0].author,
                            avator: data[0].avator,
                            content: data[0].content,
                            statisticsUrl: data[0].statisticsUrl,
                            ad_img: data[0].ad_img
                        }

                        mem.set('unjump_'+req.params.index,JSON.stringify(res_data),60*1000).then(function(){
                             console.log('---------set unjump value---------')
                        })
                        res.render('tuiguang/unjump',res_data);
                    } else {
                        res.send('没有查询到此链接，请先创建')
                    }
                }
            })
        }
    }).catch(function(err){
        console.log(err);
    });
    
})

module.exports = router;