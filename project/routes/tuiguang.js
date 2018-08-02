var express = require('express');
var router = express.Router();
var TuiGuangModel = require('../model/TuiGuang.js');
var mem = require('../util/mem.js')

router.get('/weitiao/:index', function(req, res, next) {
    mem.get('weitiao_'+req.params.index).then(function(value){
        if(value){
            console.log('---------get weitiao value---------')
            console.log(value);
            console.log('------------------')
            var res_data = JSON.parse(value);
            res.render('tuiguang/weitiao',res_data);
        }else{
            var selector = {id: req.params.index}
            TuiGuangModel.find(selector, function(err, data){
                if (err) {
                    console.log("Error:" + err);
                }
                else {
                    if (data != '') {
                        var res_data={
                            pageTitle: data[0].pageTitle,
                            articleTit: data[0].articleTit,
                            name: data[0].name,
                            desc: data[0].desc,
                            picurl: data[0].picurl,
                            capter1: data[0].capter1,
                            linkUrl: data[0].linkUrl,
                            statisticsUrl1: data[0].statisticsUrl1
                        }

                        mem.set('weitiao_'+req.params.index,JSON.stringify(res_data),60).then(function(){
                             console.log('---------set weitiao value---------')
                        })
                        res.render('tuiguang/weitiao',res_data);
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

router.get('/singlepage/:index', function(req, res, next) {
    mem.get('singlepage_'+req.params.index).then(function(value){
        if(value){
            console.log('---------get singlepage value---------')
            console.log(value);
            console.log('------------------')
            var res_data = JSON.parse(value);
            res.render('tuiguang/singlepage',res_data);
        }else{
            var selector = {id: req.params.index}
            TuiGuangModel.find(selector, function(err, data){
                if (err) {
                    console.log("Error:" + err);
                }
                else {
                    if (data != '') {
                        var res_data={
                            pageTitle: data[0].pageTitle,
                            articleTit: data[0].articleTit,
                            name: data[0].name,
                            desc: data[0].desc,
                            picurl: data[0].picurl,
                            capter1: data[0].capter1,
                            statisticsUrl1: data[0].statisticsUrl1
                        }

                        mem.set('singlepage_'+req.params.index,JSON.stringify(res_data),60).then(function(){
                             console.log('---------set singlepage value---------')
                        })
                        res.render('tuiguang/singlepage',res_data);
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

router.get('/multipage/:index', function(req, res, next) {
    mem.get('multipage_'+req.params.index).then(function(value){
        if(value){
            console.log('---------get multipage value---------')
            console.log(value);
            console.log('------------------')
            var res_data = JSON.parse(value);
            res.render('tuiguang/multipage',res_data);
        }else{
            var selector = {id: req.params.index}
            TuiGuangModel.find(selector, function(err, data){
                if (err) {
                    console.log("Error:" + err);
                }
                else {
                    if (data != '') {
                        var res_data={
                            pageTitle: data[0].pageTitle,
                            articleTit: data[0].articleTit,
                            name: data[0].name,
                            desc: data[0].desc,
                            picurl: data[0].picurl,
                            capter1: data[0].capter1,
                            capter2: data[0].capter2,
                            statisticsUrl1: data[0].statisticsUrl1,
                            statisticsUrl2: data[0].statisticsUrl2
                        }

                        mem.set('multipage_'+req.params.index,JSON.stringify(res_data),60).then(function(){
                             console.log('---------set multipage value---------')
                        })
                        res.render('tuiguang/multipage',res_data);
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